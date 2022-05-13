import { useState } from 'react';
import { useFormik } from 'formik';
import Notification, { notify } from '../Notification/Notification';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import * as Yup from 'yup';

import theme from '../../constants/theme';
import { signIn, signUp } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

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

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'The username must be between 3 and 20 characters.')
      .max(20, 'The username must be between 3 and 20 characters.')
      .required('This field is required!'),
    password: Yup.string()
      .min(6, 'The password must be between 6 and 10 characters.')
      .max(10, 'The password must be between 6 and 10 characters.')
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
        signIn(email, password);
        setState({
          ...state,
          successful: true,
        }),
          navigate('/');
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

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

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
        <Button sx={{ position: 'absolute', top: '0', left: '0' }} onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon sx={{ fontSize: '66px' }} />
        </Button>
        <form onSubmit={formik.handleSubmit}>
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
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="username"
                name="username"
                label="Username"
                type="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
              Sign up
            </Button>
          </Box>
        </form>
        <Notification />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
