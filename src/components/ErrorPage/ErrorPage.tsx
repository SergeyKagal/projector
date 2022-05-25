import { Button } from '@mui/material';

import { PATH } from '../../constants/paths';

import './ErrorPage.scss';

export const ErrorPage: React.FC = () => {
  const isUnauthrizedError = window.location.pathname === '/unauthorize';

  const notFoundHandler = () => {
    window.history.back();
  };
  const unAuthorizedHandler = () => {
    window.location.replace(PATH.BASE_URL);
  };

  return (
    <div className="error-page-wrapper">
      <h2> {isUnauthrizedError ? '401' : '404'}</h2>
      <h3>Whoops!</h3>
      <h4>{isUnauthrizedError ? 'Authorization error' : 'Page Not Found'}</h4>
      <Button
        onClick={() => {
          isUnauthrizedError ? unAuthorizedHandler() : notFoundHandler();
        }}
        variant="contained"
        color="primary"
      >
        {isUnauthrizedError ? 'welcome page' : 'Go BACK'}
      </Button>
    </div>
  );
};
