import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/app/App';
import { Header } from './Components/header/header';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Header />);
