import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import { deleteColumn, deleteTask, getBoardById, updateColumn } from '../../api/api';
import AddNewColumnForm from '../../components/Forms/AddNewColumnForm/AddNewColumnForm';
import ConfirmPopUp from '../../components/ConfirmPopUp/ConfirmPopUp';
import { Header } from '../../components/Header/Header';
import { IBoard, IColumn, ITask } from '../../constants/interfaces';
import getColumnsColor from '../../utils/getColumnsColor';
import { GlobalContext } from '../../provider/provider';
import AddNewBoardForm from '../../components/Forms/AddNewBoardForm/AddNewBoardForm';
import Notification, { notify } from '../../components/Notification/Notification';
import { Card, Typography, CardContent } from '@mui/material';
import AddNewTaskForm from '../../components/Forms/AddNewTaskForm/AddNewTaskForm';
import EditTaskForm from '../../components/Forms/EditTaskForm/EditTaskForm';

import { localizationContent } from '../../localization/types';
import Footer from '../../components/Footer/Footer';
import Column from '../../components/Column/Column';

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

  const colors = getColumnsColor(board);

  const columns = board?.columns.map((column, index) => {
    return (
      <Column
        index={index}
        key={column.id}
        board={board}
        setBoard={setBoard}
        column={column}
        color={colors.get(column.id) || '#87A8EC'}
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

    const reorder = async (list: IColumn[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (type === 'column') {
      if (board) {
        const reorderedColumns = await reorder(board.columns, source.index, destination.index);
        if (board) {
          setBoard({
            id: board.id,
            description: board.description,
            title: board.title,
            columns: reorderedColumns,
          });
          updateColumn(board.id, board.columns[source.index], destination.index + 1);
        }
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

        <h3>
          {localizationContent.board.header} «{board?.title}»
        </h3>

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
