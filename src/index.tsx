import ReactDOM from 'react-dom/client';
import AppContainer from './components/App/AppContainer';
import '@fontsource/roboto';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppContainer />);
