import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InputIcon from '@mui/icons-material/Input';
import * as Yup from 'yup';

import { signIn } from '../../api/api';
import theme from '../../constants/theme';
import { getUserInformation, GlobalContext } from '../../provider/provider';

const SignIn = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(GlobalContext);

  interface IState {
    email: string;
    password: string;
    loading: boolean;
  }

  const initialState = {
    email: '',
    password: '',
    loading: false,
  };

  const [state, setState] = useState<IState>(initialState);

  const validationSchema = Yup.object({
    email: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  function handleLogin(formValue: { email: string; password: string }) {
    const { email, password } = formValue;
    setState({ ...state, loading: true });

    signIn(email, password).then(
      () => {
        setState({
          ...state,
          loading: false,
        });
        setUserState(getUserInformation());
        navigate('/main');
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setState({
          ...state,
          loading: false,
        });
        notify(resMessage);
      }
    );
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  if (userState.isUserSignIn) {
    return <Navigate to={'/main'} />;
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
          minHeight: '100vh',
        }}
      >
        <Button sx={{ position: 'absolute', top: '0', left: '0' }} onClick={() => navigate('/')}>
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
              <InputIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box sx={{ px: 0, py: 2 }}>
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
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
          </Box>
        </form>
        <Notification />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
