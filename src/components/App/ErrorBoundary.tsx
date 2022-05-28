import React, { Component } from 'react';
import { ErrorInfo } from 'react';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { errors } from '../../constants/errors';

interface IState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface IProps {
  children?: React.ReactNode;
}

export default class ErrorBoundary extends Component<IProps> {
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
    return this.props.children;
  }
}
