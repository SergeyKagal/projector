import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import './ErrorPage.scss';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const { isUnauthrizedError, setIsUnauthorizedError } = useContext(GlobalContext);
  const notFoundHandler = () => {
    navigate(-1);
  };
  const unAuthorizedHandler = () => {
    setIsUnauthorizedError(false);
    navigate(PATH.BASE_URL);
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
