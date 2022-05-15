import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteColumn, getBoardById } from '../../api/api';
import { IBoard, IColumn } from '../../constants/interfaces';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Header } from '../Header/Header';
import './board.scss';
import AddNewColumnForm from '../AddNewColumnForm/AddNewColumnForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import Column from '../Column/Column';

export const Board = () => {
  const navigate = useNavigate();

  const params = useParams<{ id: string }>().id || '';

  const [board, setBoard] = useState<IBoard | null>(null);
  const [isAddColumnFormOpen, setIsAddColumnFormOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<IColumn | null>(null);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);

  const setIsAddBoardFormOpen = () => {
    return false;
  };

  useEffect(() => {
    getBoardById(params).then((response) => {
      if (response) {
        setBoard(response);
      }
    });
  }, [params]);

  const handleDeleteColumn = async (columnToDelete: IColumn) => {
    setShowConfirmPopUp(false);

    if (board) await deleteColumn(board.id, columnToDelete.id);

    const newBoard = await getBoardById(params);
    setBoard(newBoard);
  };

  board?.columns.sort((a, b) => (a.order > b.order ? 1 : -1));

  const columns = board?.columns.map((column) => {
    return (
      <Column
        key={column.id}
        column={column}
        setColumnToDelete={setColumnToDelete}
        setShowConfirmPopUp={setShowConfirmPopUp}
      />
      // <Container key={column.id} className="column">
      //   <div className="column__title">
      //     {column.title}
      //     <Button sx={{ p: '0px', minWidth: '' }} onClick={(event) => handleClick(event, column)}>
      //       {<DeleteIcon />}
      //     </Button>
      //   </div>
      //   <Button variant="text" className="button-add-item" startIcon={<AddIcon />}>
      //     ADD TASK
      //   </Button>
      // </Container>
    );
  });

  return (
    <>
      <Header setIsAddBoardFormOpen={setIsAddBoardFormOpen} />

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
    </>
  );
};
