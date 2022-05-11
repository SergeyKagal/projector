import './Main.scss';
import theme from '../../constants/theme';
import { Header } from '../Header/Header';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants/paths';
import axios from 'axios';
import { token } from '../../constants/mockValues';
import { getBoards } from '../../api/api';
import { Board } from '../../constants/interfaces';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [boardsArray, setBoardsArray] = useState<Board[]>([]);
  const navigate = useNavigate();

  // для апи
  useEffect(() => {
    getBoards(token).then((response) => {
      if (response) setBoardsArray(response);
    });
  }, []);

  const deleteBoard = async (boardId: string) => {
    axios.delete(`${API_URL}/boards/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
        'Content-Type': 'application/json',
      },
    });

    const newBoardsArray = boardsArray.filter((board) => board.id !== boardId);
    setBoardsArray(newBoardsArray);
  };

  const onPreviewBoardClickHandler = (board: Board) => {
    navigate(`board/${board.title}`);
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

        <Button sx={{ color: '#fff' }} onClick={() => deleteBoard(board.id)}>
          {<DeleteIcon />}
        </Button>
      </Card>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <div className="boards">
        <Typography variant="h4" align="center" color="text.secondary" paragraph>
          {`Your boards:`}
        </Typography>
        <div className="boards__container">{boardsToShow}</div>
      </div>
    </ThemeProvider>
  );
};

export default Main;
