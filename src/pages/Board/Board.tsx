import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import { deleteColumn, deleteTask, getBoardById, updateColumn, updateTask } from '../../api/api';
import AddNewColumnForm from '../../components/Forms/AddNewColumnForm/AddNewColumnForm';
import ConfirmPopUp from '../../components/ConfirmPopUp/ConfirmPopUp';
import { Header } from '../../components/Header/Header';
import { IBoard, IColumn, ITask } from '../../constants/interfaces';
import getColumnsColor from '../../utils/getColumnsColor';
import { GlobalContext } from '../../provider/provider';
import AddNewBoardForm from '../../components/Forms/AddNewBoardForm/AddNewBoardForm';
import Notification, { notify } from '../../components/Notification/Notification';
import { Card, Typography } from '@mui/material';
import AddNewTaskForm from '../../components/Forms/AddNewTaskForm/AddNewTaskForm';
import EditTaskForm from '../../components/Forms/EditTaskForm/EditTaskForm';
import { localizationContent } from '../../localization/types';
import Footer from '../../components/Footer/Footer';
import Column from '../../components/Column/Column';
import './Board.scss';
import Box from '@mui/system/Box';
import TitleSkeleton from '../../components/Skeleton/TitleSkeleton';
import ColumnSkeleton from '../../components/Skeleton/ColumnSkeleton';

export const Board = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>().id || '';

  const [board, setBoard] = useState<IBoard | null>(null);
  const [isAddColumnFormOpen, setIsAddColumnFormOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<IColumn | null>(null);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [columnToAddTask, setColumnToAddTask] = useState<IColumn | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);

  const { isCreateNewBoardOpen } = useContext(GlobalContext);

  const bgrUrl = localStorage.getItem('bgrUrl') || '';

  const storedColors = board && window.localStorage.getItem(`ColorsForBoard#${board.id}`);
  const colors: Map<string, string> = storedColors
    ? new Map(Object.entries(JSON.parse(storedColors)))
    : getColumnsColor(board);

  useEffect(() => {
    setIsLoading(true);

    getBoardById(params).then(
      (response) => {
        if (response) {
          response.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
          setBoard(response);
          setIsLoading(false);
        }
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setIsLoading(false);
        notify(resMessage);
      }
    );
  }, [params]);

  const handleDeleteColumn = async (columnToDelete: IColumn) => {
    setIsDeleteDisabled(true);
    if (!board) return;
    try {
      await deleteColumn(board.id, columnToDelete.id).then((res) => {
        if (res.status === 204) {
          notify(localizationContent.deleted);
        }
      });

      const newBoard = await getBoardById(params);
      newBoard.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
      setBoard(newBoard);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      setShowConfirmPopUp(false);
      setColumnToDelete(null);
      setIsDeleteDisabled(false);
    }
  };

  const handleDeleteTask = async (task: ITask) => {
    setIsDeleteDisabled(true);
    if (!board) return;

    try {
      await deleteTask(task).then((res) => {
        if (res.status === 204) {
          notify(localizationContent.deleted);
        }
      });

      const newBoard = await getBoardById(params);
      newBoard.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
      setBoard(newBoard);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      setIsDeleteDisabled(false);
      setShowConfirmPopUp(false);
      setTaskToDelete(null);
    }
  };

  const columns = board?.columns.map((column, index) => {
    const currentColor = colors.get(column.id) || '#6a93e8';

    if (!colors.get(column.id)) {
      colors.set(column.id, currentColor);
    }

    return (
      <Column
        index={index}
        key={column.id}
        board={board}
        setBoard={setBoard}
        column={column}
        color={currentColor}
        setColumnToDelete={setColumnToDelete}
        setShowConfirmPopUp={setShowConfirmPopUp}
        setColumnToAddTask={setColumnToAddTask}
        setTaskToEdit={setTaskToEdit}
        setTaskToDelete={setTaskToDelete}
      />
    );
  });

  board &&
    window.localStorage.setItem(
      `ColorsForBoard#${board.id}`,
      JSON.stringify(Object.fromEntries(colors))
    );

  async function handleDragEnd(result: DropResult) {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const reorderColumns = async (list: IColumn[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (type === 'column') {
      if (board) {
        const reorderedColumns = await reorderColumns(
          board.columns,
          source.index,
          destination.index
        );

        setBoard({
          id: board.id,
          description: board.description,
          title: board.title,
          columns: reorderedColumns,
        });
        updateColumn(board.id, board.columns[source.index], destination.index + 1);
      }
    }

    const reorderTasks = async (list: ITask[], startIndex: number, endIndex: number) => {
      const reorderedTasks = Array.from(list);
      const [removed] = reorderedTasks.splice(startIndex, 1);
      removed.order = endIndex + 1;
      reorderedTasks.splice(endIndex, 0, removed);
      // Назначаем новый ордер всем таскам в колонке
      for (let i = 0; i < reorderedTasks.length; i++) {
        reorderedTasks[i].order = i + 1;
      }
      return reorderedTasks;
    };

    // Колонка, из которой берем таск
    const home = board?.columns.find((column) => column.id === source.droppableId);
    const homeOrder = board?.columns.findIndex((obj) => {
      return obj.id === home?.id;
    });
    // Колонка, куда помещаем таск
    const foreign = board?.columns.find((column) => column.id === destination.droppableId);
    const foreignOrder = board?.columns.findIndex((obj) => {
      return obj.id === foreign?.id;
    });

    if (board && home && foreign) {
      // Перемещаем таск в пределах одной коллонки
      if (home === foreign) {
        const reorderedTasks = await reorderTasks(home.tasks, source.index, destination.index);
        const newColumn: IColumn = {
          ...home,
          tasks: reorderedTasks,
        };
        const result = board?.columns;

        if (result && homeOrder !== undefined) {
          result[homeOrder] = newColumn;

          const newState = {
            id: board.id,
            description: board.description,
            title: board.title,
            columns: result,
          };
          setBoard(newState);

          const updatedTask = {
            ...home.tasks[source.index],
            order: destination.index + 1,
            boardId: board.id,
            columnId: source.droppableId,
          };
          updateTask(updatedTask);
        }
        // перемещаем таск из одной колонки в другую
      } else if (home !== foreign) {
        // Вырезаем таск из старой колонки
        const homeTasks = Array.from(home.tasks);
        const [target] = homeTasks.splice(source.index, 1);
        for (let i = 0; i < homeTasks.length; i++) {
          homeTasks[i].order = i + 1;
        }
        const newHome: IColumn = {
          ...home,
          tasks: homeTasks,
        };

        // Вставляем в новую колонку
        const foreignTasks = Array.from(foreign.tasks);
        foreignTasks.splice(destination.index, 0, target);
        for (let i = 0; i < foreignTasks.length; i++) {
          foreignTasks[i].order = i + 1;
        }
        const newForeign: IColumn = {
          ...foreign,
          tasks: foreignTasks,
        };

        const result = board?.columns;

        if (result && homeOrder !== undefined && foreignOrder !== undefined) {
          result[homeOrder] = newHome;
          result[foreignOrder] = newForeign;

          const newState = {
            id: board.id,
            description: board.description,
            title: board.title,
            columns: result,
          };
          setBoard(newState);
        }

        const updatedTask = {
          ...home.tasks[source.index],
          order: destination.index + 1,
          boardId: board.id,
          columnId: source.droppableId,
        };
        updateTask(updatedTask, destination.droppableId);
      }
    }
  }

  return (
    <>
      <Header />

      <div className="board" style={{ backgroundImage: `url(${bgrUrl})` }}>
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            top: '108px',
            left: '46px',
            backgroundColor: 'background.paper',
            color: 'primary.main',
            p: '12px',
            opacity: 0.9,
          }}
          onClick={() => navigate(-1)}
        >
          <KeyboardBackspaceIcon sx={{ fontSize: '42px' }} />
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <TitleSkeleton />
          ) : (
            board && (
              <Card
                sx={{
                  minWidth: 0.6,
                  overflow: 'unset',
                  mt: '18px',
                  opacity: 0.9,
                  boxShadow: 'none',
                  p: '16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" color="text.secondary" sx={{ mx: '10px' }}>
                  {board?.title}:
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 16, pt: '1px' }} color="text.primary">
                  {board?.description}
                </Typography>
              </Card>
            )
          )}
        </Box>
        {isLoading ? (
          <ColumnSkeleton />
        ) : (
          <div className="columns-container">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                  <div className="all-columns" ref={provided.innerRef} {...provided.droppableProps}>
                    {columns}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              variant="contained"
              className="button-add-item"
              startIcon={<AddIcon />}
              onClick={() => setIsAddColumnFormOpen(true)}
            >
              {localizationContent.buttons.addColumn}
            </Button>
          </div>
        )}
      </div>

      <Footer />

      {isAddColumnFormOpen && board && (
        <AddNewColumnForm
          setIsAddColumnFormOpen={setIsAddColumnFormOpen}
          board={board}
          setBoard={setBoard}
          colors={colors}
        />
      )}

      {columnToDelete && (
        <ConfirmPopUp
          description={`${localizationContent.deleteColumn.description} "${columnToDelete.title}"?`}
          isOpen={isShowConfirmPopUp}
          toShowPopUp={setShowConfirmPopUp}
          onConfirm={() => {
            handleDeleteColumn(columnToDelete);
          }}
          onCancel={() => {
            setShowConfirmPopUp(false);
            setColumnToDelete(null);
          }}
          isDisabled={isDeleteDisabled}
        />
      )}

      {isCreateNewBoardOpen && <AddNewBoardForm />}

      {columnToAddTask && board && (
        <AddNewTaskForm
          setColumnToAddTask={setColumnToAddTask}
          setBoard={setBoard}
          boardId={board.id}
          column={columnToAddTask}
        />
      )}

      {taskToEdit && board && (
        <EditTaskForm
          task={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          setBoard={setBoard}
          boardId={board.id}
        />
      )}

      {taskToDelete && (
        <ConfirmPopUp
          description={`${localizationContent.deleteTask.description} "${taskToDelete.title}"?`}
          isOpen={isShowConfirmPopUp}
          toShowPopUp={setShowConfirmPopUp}
          onConfirm={() => {
            handleDeleteTask(taskToDelete);
          }}
          onCancel={() => {
            setShowConfirmPopUp(false);
            setTaskToDelete(null);
          }}
          isDisabled={isDeleteDisabled}
        />
      )}

      <Notification />
    </>
  );
};
