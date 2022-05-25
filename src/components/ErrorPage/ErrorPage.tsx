import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/paths';
import { GlobalContext } from '../../provider/provider';
import './ErrorPage.scss';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const { isUnauthrizedError, setIsUnauthorizedError } = useContext(GlobalContext);

  const errorContent = {
    notFound: (
      <>
        <h2>404</h2>
        <h3>Whoops!</h3>
        <h4>Page Not Found</h4>
        <Button
          onClick={() => {
            navigate(-1);
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
            setIsUnauthorizedError(false);
            navigate(PATH.BASE_URL);
          }}
          variant="contained"
          color="primary"
        >
          welcome page
        </Button>
      </>
    ),
  };

  return (
    <div className="error-page-wrapper">
      {isUnauthrizedError ? errorContent.unauthorized : errorContent.notFound}
    </div>
  );
};
