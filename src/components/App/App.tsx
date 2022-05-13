import './App.scss';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Main from '../Main/Main';

import { PATH } from '../../constants/paths';
import { GlobalContext, Localization } from '../../provider/provider';
import { useState } from 'react';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import theme from '../../constants/theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  const [isUserSignIn, setUserState] = useState(true);
  const [Localize, setLocal] = useState(Localization.ru);
  const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState(false);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            isUserSignIn,
            setUserState,
            Localize,
            setLocal,
            isAddBoardFormOpen,
            setIsAddBoardFormOpen,
          }}
        >
          <Router>
            <Routes>
              <Route path={PATH.BASE_URL} element={<Welcome />} />
              <Route path={PATH.MAIN_ROUTE} element={<Main />} />
              <Route path={PATH.SIGN_IN} element={<SignIn />} />
              <Route path={PATH.SIGN_UP} element={<SignUp />} />
              <Route path={PATH.ERROR_PAGE} element={<NotFoundPage />} />
            </Routes>
          </Router>
        </GlobalContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
