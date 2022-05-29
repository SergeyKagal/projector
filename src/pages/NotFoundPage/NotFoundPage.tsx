import { Button } from '@mui/material';
import { createBrowserHistory } from 'history';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const history = createBrowserHistory();
  return (
    <div className="error-page-wrapper">
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
    </div>
  );
};

export default NotFoundPage;
