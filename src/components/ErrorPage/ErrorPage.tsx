import { Button } from '@mui/material';
import { IError } from '../../constants/errors';
// import { PATH } from '../../constants/paths';

import './ErrorPage.scss';
interface IErrorProps {
  error: IError;
}
export const ErrorPage: React.FC<IErrorProps> = (error) => {
  return (
    <div className="error-page-wrapper">
      <h2> {error.error.title}</h2>
      <h3>Whoops!</h3>
      <h4>{error.error.description}</h4>
      <Button
        onClick={() => {
          error.error.buttonHandler();
        }}
        variant="contained"
        color="primary"
      >
        {error.error.buttonTitle}
      </Button>
    </div>
  );
};
