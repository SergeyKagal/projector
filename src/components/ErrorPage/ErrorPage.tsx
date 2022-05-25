import { Button } from '@mui/material';
import { createBrowserHistory } from 'history';
import { PATH } from '../../constants/paths';
import './ErrorPage.scss';

const history = createBrowserHistory();
const errorContent = {
  notFound: (
    <>
      <h2>404</h2>
      <h3>Whoops!</h3>
      <h4>Page Not Found</h4>
      <Button
        onClick={() => {
          history.back();
        }}
        variant="contained"
        color="primary"
      >
        Go BACK
      </Button>
    </>
  ),
  unauthorized: (
    <>
      <h2>401</h2>
      <h3>Whoops!</h3>
      <h4>Authorization error</h4>
      <Button
        onClick={() => {
          if (localStorage.getItem('AUTHORIZATION_ERROR')) {
            localStorage.removeItem('AUTHORIZATION_ERROR');
          }
          history.push(PATH.BASE_URL);
          location.reload();
        }}
        variant="contained"
        color="primary"
      >
        welcome page
      </Button>
    </>
  ),
};

export const ErrorPage: React.FC = () => {
  const isUnauthorized = localStorage.getItem('AUTHORIZATION_ERROR') || null;
  return (
    <div className="error-page-wrapper">
      {isUnauthorized ? errorContent.unauthorized : errorContent.notFound}
    </div>
  );
};
