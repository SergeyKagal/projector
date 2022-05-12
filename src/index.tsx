import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/app/App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import "@fontsource/roboto";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
