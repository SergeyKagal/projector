import './Main.scss';
import theme from '../../constants/theme';
import { Header } from '../header/Header';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import { Board } from '../../constants/interfaces';
import { useContext } from 'react';
import { GlobalContext } from '../../provider/provider';
import { boardsArray } from '../../constants/mockValues';

const Main = () => {
  // const { boardsArray } = useContext(GlobalContext);
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

        <Button sx={{ color: '#fff' }}>{<DeleteIcon />}</Button>
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
