import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardById } from '../../api/api';
import { IBoard } from '../../constants/interfaces';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Header } from '../Header/Header';
import './board.scss';
import Container from '@mui/material/Container';
import AddNewColumnForm from '../AddNewColumnForm/AddNewColumnForm';

export const Board = () => {
  const params = useParams<{ id: string }>().id || '';
  const [board, setBoard] = useState<IBoard | null>(null);
  const [isAddColumnFormOpen, setIsAddColumnFormOpen] = useState(false);

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

  console.log(board);

  return (
    <>
      <Header setIsAddBoardFormOpen={setIsAddBoardFormOpen} />

      <div className="board">
        <h3>Board «{board?.title}»</h3>
        <Container>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsAddColumnFormOpen(true)}
          >
            ADD NEW COLUMN
          </Button>
          {/* <div className="column"></div> */}
        </Container>
      </div>

      {isAddColumnFormOpen && board && (
        <AddNewColumnForm
          setIsAddColumnFormOpen={setIsAddColumnFormOpen}
          board={board}
          setBoard={setBoard}
        />
      )}
    </>
  );
};
