import { Button } from '@mui/material';
import { IError } from '../../constants/errors';

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
      {error.error.buttonTitle && (
        <Button
          onClick={() => {
            error.error.buttonHandler();
          }}
          variant="contained"
          color="primary"
        >
          {error.error.buttonTitle}
        </Button>
      )}
    </div>
  );
};
