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
import { Navigate, useNavigate } from 'react-router-dom';
import AddNewBoardForm from '../AddNewBoardForm/AddNewBoardForm';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import { PATH } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import { localizationContent } from '../../localization/types';
import Footer from '../Footer/Footer';
import { notify } from '../Notification/Notification';
import axios from 'axios';

const Main = () => {
  const navigate = useNavigate();

  const { isCreateNewBoardOpen, boardsArray, setBoardsArray, userState } =
    useContext(GlobalContext);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<IBoard | null>(null);

  useEffect(() => {
    getBoards().then(
      (response) => {
        if (response) {
          setBoardsArray(response);
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
  }, [setBoardsArray]);

  if (!userState.isUserSignIn) {
    return <Navigate to={PATH.BASE_URL} />;
  }

  const handleCardClick = (board: IBoard) => {
    navigate(`board/${board.id}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, board: IBoard) => {
    event.stopPropagation();
    setBoardToDelete(board);
    setShowConfirmPopUp(true);
  };

  const handleDeleteBoard = async (boardToDelete: IBoard) => {
    try {
      await deleteBoard(boardToDelete.id);

      const newBoardsArray = await getBoards();
      setBoardsArray(newBoardsArray);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      setShowConfirmPopUp(false);
    }
  };

  const boardsToShow = boardsArray.map((board) => {
    return (
      <Card
        key={board.id}
        sx={{
          backgroundColor: '#6a93e8',
        }}
        className="boards__card"
        onClick={() => handleCardClick(board)}
      >
        <CardContent sx={{ flexGrow: 1, p: '10px' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            {board.title.toUpperCase()}
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
      <Header />

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

      {isCreateNewBoardOpen && <AddNewBoardForm />}
    </>
  );
};

export default Main;