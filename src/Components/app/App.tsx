import { Routes, Route } from 'react-router-dom';

import AuthPage from '../../pages/AuthPage';
import HomePage from '../../pages/HomePage';

import './App.css';
import './app.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
