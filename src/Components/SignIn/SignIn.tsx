import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';

import { signIn } from '../../api/api';

import 'react-toastify/dist/ReactToastify.css';

const notify = (text: string) => {
  toast.info(text, {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const SignIn = () => {
  const navigate = useNavigate();
  interface IState {
    username: string;
    password: string;
    loading: boolean;
  }

  const initialState = {
    username: '',
    password: '',
    loading: false,
  };

  const [state, setState] = useState<IState>(initialState);

  function validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!'),
    });
  }

  function handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;
    setState({ ...state, loading: true });

    signIn(username, password).then((response) => {
      if (!response.error) {
        setState({
          ...state,
          loading: false,
        }),
        navigate('/');
      } else {
        const resMessage = response.error?.response?.data.message;
        setState({
          ...state,
          loading: false,
        }),
          notify(resMessage);
      }
    });
  }

  return (
    <div>
      <div className="card card-container">
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage name="username" component="div" className="alert alert-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="alert alert-danger" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={state.loading}>
                {state.loading && <span className="spinner-border spinner-border-sm"></span>}
                <span>Login</span>
              </button>
            </div>
            <ToastContainer />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
