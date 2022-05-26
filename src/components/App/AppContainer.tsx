import { Component, ErrorInfo } from 'react';
import { errors } from '../../constants/errors';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import App from './App';

interface IState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class AppContainer extends Component {
  state: IState = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return <ErrorPage error={errors.Other} />;
    }

    return <App />;
  }
}
