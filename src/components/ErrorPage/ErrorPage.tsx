import { Button } from '@mui/material';
import { createBrowserHistory } from 'history';
import { PATH } from '../../constants/paths';
import '../NotFoundPage/NotFoundPage.scss';

export const ErrorPage: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <div className="error-page-wrapper">
      <h2>401</h2>
      <h3>Whoops!</h3>
      <h4>Authrization error</h4>
      <Button
        onClick={() => {
          history.push(PATH.BASE_URL);
        }}
        variant="contained"
        color="primary"
      >
        welcome page
      </Button>
    </div>
  );
};
