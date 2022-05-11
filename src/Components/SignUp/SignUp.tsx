import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { signUp } from '../../api/api';

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

const SignUp = () => {
  interface IState {
    username: string;
    email: string;
    password: string;
    successful: boolean;
  }

  const initialState = {
    username: '',
    email: '',
    password: '',
    successful: false,
  };

  const [state, setState] = useState<IState>(initialState);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'The username must be between 3 and 20 characters.')
      .max(20, 'The username must be between 3 and 20 characters.')
      .required('This field is required!'),
      password: Yup.string()
      .min(6, 'The password must be between 6 and 40 characters.')
      .max(10, 'The password must be between 6 and 40 characters.')
      .required('This field is required!'),
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
  });

  function handleRegister(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;
    setState({
      ...state,
      successful: false,
    });

    signUp(username, email, password).then(
      () => {
        setState({
          ...state,
          successful: true,
        }),
          notify('Success registration');
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setState({ ...state, successful: false }), notify(resMessage);
      }
    );
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div>
              <div className="form-group">
                <label htmlFor="username"> Username </label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage name="username" component="div" className="alert alert-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="alert alert-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="alert alert-danger" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
