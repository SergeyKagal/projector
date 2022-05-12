import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { Avatar, Box, Button, Container, ThemeProvider, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';

import theme from '../../constants/theme';
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
          onSubmit={handleRegister}
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
                <AccountBoxIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
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
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
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
              >
                Sign up
              </Button>
            </Box>
          </Form>
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
