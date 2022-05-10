import './Main.scss';
import theme from '../../constants/theme';
import { Header } from '../header/Header';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../provider/provider';
import { API_URL } from '../../constants/paths';
import axios from 'axios';
import { token } from '../../constants/mockValues';
import { getBoards } from '../../api/api';

const Main = () => {
  const { boardsArray } = useContext(GlobalContext);
  const { setBoardsArray } = useContext(GlobalContext);

  // const deleteBoard = (boardId: string) => {
  // const deleteBoardFromApi = async () => {
  //       const response = await axios.post(`${API_URL}/boards`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: `application/json`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //     };
  // setBoardsArray(response.data);
  // };

  const deleteBoard = (boardId: string) => {
    // const newBoardsArray = boardsArray.filter((board) => board.id !== boardId);
    // setBoardsArray(newBoardsArray);
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
