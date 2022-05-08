import './App.css';
import './app.scss';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Main from '../Main/Main';
import { MAIN_ROUTE, SIGN_IN, SIGN_UP } from '../../constants/paths';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string>(window.localStorage.getItem('token') || '');
  // const token = 'exist';

  return (
    <div className="app">
      <Routes>
        {token ? (
          <Route path={MAIN_ROUTE} element={<Main token={token} />} />
        ) : (
          <Route path="/" element={<Welcome />} />
        )}
        <Route path={SIGN_IN} element={<SignIn />} />
        <Route path={SIGN_UP} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
