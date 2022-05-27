import { PATH } from './paths';

export interface IError {
  title: string;
  description: string;
  buttonTitle: string;
  buttonHandler: () => void;
}

export interface IErrors {
  '401': IError;
  '404': IError;
  Other: IError;
}

export const errors: IErrors = {
  '401': {
    title: '401',
    buttonTitle: 'welcome page',
    description: 'Authorization error',
    buttonHandler: () => {
      window.location.replace(PATH.BASE_URL);
    },
  },
  '404': {
    title: '404',
    description: 'Page Not Found',
    buttonTitle: 'go back',
    buttonHandler: () => {
      window.history.back();
    },
  },
  Other: {
    title: 'Error',
    description: 'Something went wrong......',
    buttonTitle: 'welcome page',
    buttonHandler: () => {
      window.location.replace(PATH.BASE_URL);
    },
  },
};
