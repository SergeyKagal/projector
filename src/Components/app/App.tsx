import './app.scss';
import SignIn from '../Signin/SignIn';
import SignUp from '../Signup/SignUp';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Main from '../Main/Main';

import { BASE_URL, MAIN_ROUTE, SIGN_IN, SIGN_UP } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import { useState } from 'react';

function App() {
  const [isUserSignIn, setUserState] = useState(true);

  return (
    <div className="app">
      <GlobalContext.Provider value={{ isUserSignIn, setUserState }}>
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
