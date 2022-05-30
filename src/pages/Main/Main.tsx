import './Main.scss';
import { Header } from '../../components/Header/Header';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import { deleteBoard, getBoards } from '../../api/api';
import { IBoard } from '../../constants/interfaces';
import { Navigate, useNavigate } from 'react-router-dom';
import AddNewBoardForm from '../../components/Forms/AddNewBoardForm/AddNewBoardForm';
import ConfirmPopUp from '../../components/ConfirmPopUp/ConfirmPopUp';
import { PATH } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import { localizationContent } from '../../localization/types';
import Footer from '../../components/Footer/Footer';
import Notification, { notify } from '../../components/Notification/Notification';
import axios from 'axios';
import BoardsSkeleton from '../../components/Skeleton/BoardsSkeleton';

export const Main = () => {
  const navigate = useNavigate();

  const { isCreateNewBoardOpen, boardsArray, setBoardsArray, userState } =
    useContext(GlobalContext);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<IBoard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bgrUrl, setBgrUrl] = useState('' || localStorage.getItem('bgrUrl'));

  const changeBackground = async () => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&&client_id=nwRpYv6V0PqOKIPPobvCaSByNX5UwvXBsMEfcoi0usE`;
    const res = await axios(url);
    localStorage.setItem('bgrUrl', res.data.urls.regular);
    setBgrUrl(res.data.urls.regular);
  };

  useEffect(() => {
    setIsLoading(true);
    getBoards().then(
      (response) => {
        if (response) {
          setBoardsArray(response);
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
      await deleteBoard(boardToDelete.id).then((res) => {
        if (res.status === 204) {
          notify(localizationContent.deleted);
        }
      });
      window.localStorage.removeItem(boardToDelete.id);

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

  const cutBoardTitle = (title: string) => {
    return title.length > 10 ? title.split('').splice(0, 10).join('') + '...' : title;
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
          <Typography noWrap variant="h6" component="h2" sx={{ color: '#fff' }}>
            {cutBoardTitle(board.title)}
          </Typography>
        </CardContent>

        <Button sx={{ color: '#fff' }} onClick={(event) => handleClick(event, board)}>
          {<DeleteIcon />}
        </Button>
      </Card>
    );
  });

  return (
    <div className="main-page" style={{ backgroundImage: `url(${bgrUrl})` }}>
      <Header setMainPageBgr={changeBackground} />

      <main className="boards" style={{ backgroundImage: `url(${bgrUrl})` }}>
        <Card
          sx={{
            width: '220px',
            overflow: 'unset',
            mt: '18px',

            opacity: 0.9,
            my: '30px',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h4" align="center" color="text.secondary" sx={{ p: '15px' }}>
            {localizationContent.boardList}
          </Typography>
        </Card>
        {isLoading ? <BoardsSkeleton /> : <div className="boards__container">{boardsToShow}</div>}

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
      </main>

      <Notification />
      <Footer />

      {isCreateNewBoardOpen && <AddNewBoardForm />}
    </div>
  );
};

export default Main;
