import './App.css';
import './app.scss';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
