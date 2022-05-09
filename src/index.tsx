import ReactDOM from 'react-dom/client';
import './index.css';

import { Store } from './Components/store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Store />);
