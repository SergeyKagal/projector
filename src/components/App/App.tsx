import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './App.scss';
import { defaultGlobalState, GlobalContext, IUser, Localization } from '../../provider/provider';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import EditProfile from '../EditProfile/EditProfile';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Welcome from '../Welcome/Welcome';
import Main from '../Main/Main';
import { PATH } from '../../constants/paths';
import theme from '../../constants/theme';
import { Board } from '../Board/board';

function App() {
  const [userState, setUserState] = useState<IUser>(defaultGlobalState.userState);
  const [localization, setLocalization] = useState(Localization.ru);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            userState,
            setUserState,
            localization,
            setLocalization,
          }}
        >
          <Router>
            <Routes>
              <Route path={PATH.BASE_URL} element={<Welcome />} />
              <Route path={PATH.MAIN_ROUTE} element={<Main />} />
              <Route path={PATH.BOARD} element={<Board />} />
              <Route path={PATH.SIGN_IN} element={<SignIn />} />
              <Route path={PATH.SIGN_UP} element={<SignUp />} />

              <Route path={PATH.ERROR_PAGE} element={<NotFoundPage />} />
              <Route path={PATH.EDIT_PROFILE} element={<EditProfile />} />
            </Routes>
          </Router>
        </GlobalContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
