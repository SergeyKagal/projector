import './app.scss';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Main from '../Main/Main';
import { BASE_URL, MAIN_ROUTE, SIGN_IN, SIGN_UP } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import { useReducer, useState } from 'react';
import { Board } from '../../constants/interfaces';
import { boards, token } from '../../constants/mockValues';
import { getBoards } from '../../api/api';
import { boardReducer } from '../../provider/reducers';

function App() {
  // setUserState(window.localStorage.getItem('token') || ''); - для апи
  const [isUserSignIn, setUserState] = useState(true);

  // let initialBoards: Board[] = [];

  // getBoards(token).then((response) => {
  //   if (response.data) {
  //     initialBoards = response.data;
  //     console.log(response.data);
  //   }
  // });

  const [boardsArray, setBoardsArray] = useState<Board[]>([]);
  // const setBoardsArray = (boards: Board[]) => {
  //   setBoardsArrayDispatch({ type: 'SET_BOARD_ARRAY', boardsArray: boards });
  // };
  // setBoardsArray(boardsArray);

  // const [boardsArray, setBoardsArray] = useState<Board[]>(boards);

  return (
    <div className="app">
      <GlobalContext.Provider value={{ isUserSignIn, setUserState, boardsArray, setBoardsArray }}>
        <Routes>
          <Route path={BASE_URL} element={<Welcome />} />
          <Route path={MAIN_ROUTE} element={<Main />} />
          <Route path={SIGN_IN} element={<SignIn />} />
          <Route path={SIGN_UP} element={<SignUp />} />
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
