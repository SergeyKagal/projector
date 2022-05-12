import './App.scss';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Main from '../Main/Main';

import { BASE_URL, ERROR_PAGE, MAIN_ROUTE, SIGN_IN, SIGN_UP } from '../../constants/paths';
import { GlobalContext, Localization } from '../../provider/provider';
import { useState } from 'react';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

function App() {
  const [isUserSignIn, setUserState] = useState(true);
  const [Localize, setLocal] = useState(Localization.ru);

  return (
    <div className="app">
      <GlobalContext.Provider value={{ isUserSignIn, setUserState, Localize, setLocal }}>
        <Router>
          <Routes>
            <Route path={BASE_URL} element={<Welcome />} />
            <Route path={MAIN_ROUTE} element={<Main />} />
            <Route path={SIGN_IN} element={<SignIn />} />
            <Route path={SIGN_UP} element={<SignUp />} />
            <Route path={ERROR_PAGE} element={<NotFoundPage />} />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
