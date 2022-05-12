import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { Avatar, Box, Button, Container, ThemeProvider, Typography } from '@mui/material';
import { TextField } from 'formik-mui';
import InputIcon from '@mui/icons-material/Input';
import * as Yup from 'yup';

import { signIn } from '../../api/api';
import theme from '../../constants/theme';

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

    signIn(username, password).then(
      () => {
        setState({
          ...state,
          loading: false,
        }),
          navigate('/');
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setState({
          ...state,
          loading: false,
        }),
          notify(resMessage);
      }
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContext: 'center',
        }}
      >
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContext: 'space-between',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <InputIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ px: 0, py: 2 }}>
                <Field
                  sx={{ mt: 2 }}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  component={TextField}
                />
                <Field
                  sx={{ mt: 2 }}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  component={TextField}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={state.loading}
              >
                Sign in
              </Button>
              <Link to="/signup" color="text.primary">
                {"Don't have an account? Sign Up"}
              </Link>
              <ToastContainer />
            </Box>
          </Form>
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
