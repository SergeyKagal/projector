import './Main.scss';
import { Header } from '../Header/Header';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import { deleteBoard, getBoards } from '../../api/api';
import { Board } from '../../constants/interfaces';
import { Navigate, useNavigate } from 'react-router-dom';
import AddNewBoardForm from '../AddNewBoardForm/AddNewBoardForm';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import { PATH } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import { localizationContent } from '../../localization/types';
import Footer from '../Footer/Footer';

const Main = () => {
  const navigate = useNavigate();
  const [boardsArray, setBoardsArray] = useState<Board[]>([]);
  const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState(false);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<Board | null>(null);
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, board: Board) => {
    event.stopPropagation();
    setBoardToDelete(board);
    setShowConfirmPopUp(true);
  };

  const handleDeleteBoard = async (boardToDelete: Board) => {
    setShowConfirmPopUp(false);

    await deleteBoard(boardToDelete.id);

    const newBoardsArray = await getBoards();
    setBoardsArray(newBoardsArray);
  };

  const onPreviewBoardClickHandler = (board: Board) => {
    navigate(`board/${board.id}`);
  };

  const boardsToShow = boardsArray.map((board) => {
    return (
      <Card
        key={board.id}
        sx={{
          p: '10px',
          height: '50px',
          width: '20%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: '10px',
          backgroundColor: '#6a93e8',
        }}
        className="boards__card"
        onClick={() => onPreviewBoardClickHandler(board)}
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
