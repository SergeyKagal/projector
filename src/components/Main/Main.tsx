import './Main.scss';
import { Header } from '../Header/Header';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import { deleteBoard, getBoards } from '../../api/api';
import { IBoard } from '../../constants/interfaces';
import { Navigate } from 'react-router-dom';
import AddNewBoardForm from '../AddNewBoardForm/AddNewBoardForm';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import { PATH } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import { localizationContent } from '../../localization/types';
import Footer from '../Footer/Footer';

import { Link as RouterLink } from 'react-router-dom';

const Main = () => {
  // const navigate = useNavigate();
  const [boardsArray, setBoardsArray] = useState<IBoard[]>([]);
  const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState(false);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<IBoard | null>(null);
  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);

  const { userState } = useContext(GlobalContext);

  useEffect(() => {
    getBoards().then((response) => {
      if (response) {
        setBoardsArray(response);
      }
    });
  }, []);

  if (!userState.isUserSignIn) {
    return <Navigate to={PATH.BASE_URL} />;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, board: IBoard) => {
    event.stopPropagation();
    setBoardToDelete(board);
    setShowConfirmPopUp(true);
  };

  const handleDeleteBoard = async (boardToDelete: IBoard) => {
    setShowConfirmPopUp(false);

    await deleteBoard(boardToDelete.id);

    const newBoardsArray = await getBoards();
    setBoardsArray(newBoardsArray);
  };

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    // const el = e.target as HTMLDivElement;
    // if (el.classList.contains('boards__card')) {
    //   el.style.boxShadow = '0 4px 3px red';
    // }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    // const el = e.target as HTMLDivElement;
    // // el.style.boxShadow = '';
  }

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard) {
    setCurrentBoard(board);
    // console.log(boardsArray);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    const el = e.target as HTMLDivElement;
    // el.style.boxShadow = '';
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard) {
    e.preventDefault();
    if (currentBoard) {
      const currentIndex = boardsArray.indexOf(currentBoard);

      const dropIndex = boardsArray.indexOf(board);
      boardsArray.splice(currentIndex, 1);
      boardsArray.splice(dropIndex, 0, currentBoard);
      setBoardsArray(
        boardsArray.map((board) => {
          if (board.id === board.id) {
            return board;
          }
          if (board.id === currentBoard.id) {
            return currentBoard;
          }
          return board;
        })
      );
      // console.log(boardsArray);
    }
  }

  const boardsToShow = boardsArray.map((board) => {
    return (
      <Card
        key={board.id}
        sx={{
          backgroundColor: '#6a93e8',
        }}
        className="boards__card"
        component={RouterLink}
        to={`board/${board.id}`}
        draggable="true"
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e, board)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandler(e, board)}
      >
        <CardContent sx={{ flexGrow: 1, p: '10px' }}>
          <Typography variant="h6" component="h2" sx={{ color: '#fff' }}>
            {board.title}
          </Typography>
        </CardContent>

        <Button sx={{ color: '#fff' }} onClick={(event) => handleClick(event, board)}>
          {<DeleteIcon />}
        </Button>
      </Card>
    );
  });

  return (
    <>
      <Header setIsAddBoardFormOpen={setIsAddBoardFormOpen} />

      <div className="boards">
        <Typography variant="h4" align="center" color="text.secondary" paragraph>
          {localizationContent.boardList}
        </Typography>
        <div className="boards__container">{boardsToShow}</div>

        {boardToDelete && (
          <ConfirmPopUp
            description={`Are you sure to delete board "${boardToDelete.title}"?`}
            isOpen={isShowConfirmPopUp}
            toShowPopUp={setShowConfirmPopUp}
            onConfirm={() => {
              handleDeleteBoard(boardToDelete);
            }}
          />
        )}
      </div>

      <Footer />

      {isAddBoardFormOpen && (
        <AddNewBoardForm
          setBoardsArray={setBoardsArray}
          setIsAddBoardFormOpen={setIsAddBoardFormOpen}
        />
      )}
    </>
  );
};

export default Main;
