import './app.scss';

import SignIn from '../signin/SignIn';
import SignUp from '../signup/SignUp';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../welcome/Welcome';
import Main from '../main/Main';
import { BASE_URL, MAIN_ROUTE, SIGN_IN, SIGN_UP } from '../../constants/paths';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={BASE_URL} element={<Welcome />} />
        <Route path={MAIN_ROUTE} element={<Main />} />
        <Route path={SIGN_IN} element={<SignIn />} />
        <Route path={SIGN_UP} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
