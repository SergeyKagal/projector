import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import { deleteColumn, deleteTask, getBoardById, updateColumn, updateTask } from '../../api/api';
import AddNewColumnForm from '../AddNewColumnForm/AddNewColumnForm';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import { Header } from '../Header/Header';
import { IBoard, IColumn, ITask } from '../../constants/interfaces';
import getColumnsColor from '../getColumnsColor/getColumnsColor';
import { GlobalContext } from '../../provider/provider';
import AddNewBoardForm from '../AddNewBoardForm/AddNewBoardForm';
import Notification, { notify } from '../Notification/Notification';
import { Card, Typography, CardContent } from '@mui/material';
import AddNewTaskForm from '../AddNewTaskForm/AddNewTaskForm';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import { localizationContent } from '../../localization/types';
import Footer from '../Footer/Footer';
import Column from '../Column/Column';
import './board.scss';

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
  const { isCreateNewBoardOpen } = useContext(GlobalContext);

  const storedColors = board && window.localStorage.getItem(board.id);
  const colors: Map<string, string> = storedColors
    ? new Map(Object.entries(JSON.parse(storedColors)))
    : getColumnsColor(board);

  board && window.localStorage.setItem(board.id, JSON.stringify(Object.fromEntries(colors)));

  useEffect(() => {
    getBoardById(params).then(
      (response) => {
        if (response) {
          response.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
          setBoard(response);
        }
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        notify(resMessage);
      }
    );
  }, [params]);

  const handleDeleteColumn = async (columnToDelete: IColumn) => {
    if (!board) return;
    try {
      await deleteColumn(board.id, columnToDelete.id);

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
    }
  };

  const handleDeleteTask = async (task: ITask) => {
    if (!board) return;

    try {
      await deleteTask(task);

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
      setTaskToDelete(null);
    }
  };

  const columns = board?.columns.map((column, index) => {
    return (
      <Column
        index={index}
        key={column.id}
        board={board}
        setBoard={setBoard}
        column={column}
        color={colors ? (colors.get(column.id) as string) : '#6a93e8'}
        setColumnToDelete={setColumnToDelete}
        setShowConfirmPopUp={setShowConfirmPopUp}
        setColumnToAddTask={setColumnToAddTask}
        setTaskToEdit={setTaskToEdit}
        setTaskToDelete={setTaskToDelete}
      />
    );
  });

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

        if (result) {
          result[homeOrder!] = newColumn;

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

        if (result) {
          result[homeOrder!] = newHome;
          result[foreignOrder!] = newForeign;

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

      <div className="board">
        <Button
          sx={{ position: 'absolute', top: '71px', left: '10px' }}
          onClick={() => navigate(-1)}
        >
          <KeyboardBackspaceIcon sx={{ fontSize: '66px' }} />
        </Button>

        <Typography variant="h4" align="center" color="text.secondary" sx={{ my: '18px' }}>
          {localizationContent.board.header} «{board?.title}»
        </Typography>

        <Card sx={{ minWidth: 0.8, overflow: 'unset' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {localizationContent.board.description}
            </Typography>
            <Typography sx={{ fontSize: 18 }} variant="body2" color="text.primary">
              {board?.description}
            </Typography>
          </CardContent>
        </Card>

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
            variant="outlined"
            className="button-add-item"
            startIcon={<AddIcon />}
            onClick={() => setIsAddColumnFormOpen(true)}
          >
            {localizationContent.buttons.addColumn}
          </Button>
        </div>
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
        />
      )}

      <Notification />
    </>
  );
};
