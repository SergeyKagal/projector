import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteColumn, getBoardById, updateColumn } from '../../api/api';
import { IBoard, IColumn } from '../../constants/interfaces';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Header } from '../Header/Header';
import './board.scss';
import AddNewColumnForm from '../AddNewColumnForm/AddNewColumnForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import Column from '../Column/Column';
import getColumnsColor from '../getColumnsColor/getColumnsColor';
import { GlobalContext } from '../../provider/provider';
import AddNewBoardForm from '../AddNewBoardForm/AddNewBoardForm';
import { notify } from '../Notification/Notification';
import axios from 'axios';

export const Board = () => {
  const navigate = useNavigate();

  const params = useParams<{ id: string }>().id || '';

  const [board, setBoard] = useState<IBoard | null>(null);
  const [isAddColumnFormOpen, setIsAddColumnFormOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<IColumn | null>(null);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const { isCreateNewBoardOpen } = useContext(GlobalContext);

  useEffect(() => {
    getBoardById(params).then(
      (response) => {
        if (response) {
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

      const currentBoard = {
        ...board,
        columns: board.columns.filter((column) => column.id !== columnToDelete.id),
      };

      const requestsForUpdateColumns = currentBoard.columns.map((column, index) => {
        const newColumn = { ...column, order: index + 1 };
        return updateColumn(board.id, newColumn);
      });

      await Promise.all(requestsForUpdateColumns);

      const newBoard = await getBoardById(params);

      setBoard(newBoard);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      setShowConfirmPopUp(false);
    }
  };

  board?.columns.sort((a, b) => (a.order > b.order ? 1 : -1));
  const colors = getColumnsColor(board);

  const columns = board?.columns.map((column) => {
    return (
      <Column
        key={column.id}
        board={board}
        setBoard={setBoard}
        column={column}
        color={colors.get(column.id) || '#87A8EC'}
        setColumnToDelete={setColumnToDelete}
        setShowConfirmPopUp={setShowConfirmPopUp}
      />
    );
  });

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

        <h3>Board «{board?.title}»</h3>

        <div className="columns-container">
          {columns}
          <Button
            variant="outlined"
            className="button-add-item"
            startIcon={<AddIcon />}
            onClick={() => setIsAddColumnFormOpen(true)}
          >
            ADD NEW COLUMN
          </Button>
        </div>
      </div>

      {isAddColumnFormOpen && board && (
        <AddNewColumnForm
          setIsAddColumnFormOpen={setIsAddColumnFormOpen}
          board={board}
          setBoard={setBoard}
        />
      )}

      {columnToDelete && (
        <ConfirmPopUp
          description={`Are you sure to delete column "${columnToDelete.title}"?`}
          isOpen={isShowConfirmPopUp}
          toShowPopUp={setShowConfirmPopUp}
          onConfirm={() => {
            handleDeleteColumn(columnToDelete);
          }}
        />
      )}

      {isCreateNewBoardOpen && <AddNewBoardForm />}
    </>
  );
};
