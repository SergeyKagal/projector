import { useContext, useState } from 'react';
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
import { Navigate, useNavigate } from 'react-router-dom';
import { GlobalContext, getUserInformation } from '../../provider/provider';
import { PATH } from '../../constants/paths';
import { localizationContent } from '../../localization/types';

const SignUp = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(GlobalContext);

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
      .min(3, localizationContent.errors.userNameLength)
      .max(20, localizationContent.errors.userNameLength)
      .required(localizationContent.errors.required),
    password: Yup.string()
      .min(6, localizationContent.errors.passwLength)
      .max(10, localizationContent.errors.passwLength)
      .required(localizationContent.errors.required),
    email: Yup.string()
      .email(localizationContent.errors.wrongEmail)
      .required(localizationContent.errors.required),
  });

  function handleRegister(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;
    setState({
      ...state,
      successful: false,
    });

    signUp(username, email, password)
      .then(
        async () => {
          await signIn(email, password);
          await setState({
            ...state,
            successful: true,
          });
          await setUserState(getUserInformation());
          navigate(PATH.MAIN_ROUTE);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setState({ ...state, successful: false });
          notify(resMessage);
        }
      )
      .then(() => {});
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  if (userState.isUserSignIn) {
    return <Navigate to={PATH.MAIN_ROUTE} />;
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
              {localizationContent.signUpDialog.title}
            </Typography>
            <Box sx={{ px: 0, py: 2 }}>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="username"
                name="username"
                label={localizationContent.formFieldsLabels.userName}
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
                label={localizationContent.formFieldsLabels.email}
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
                label={localizationContent.formFieldsLabels.passw}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
              {localizationContent.buttons.signUp}
            </Button>
          </Box>
        </form>
        <Notification />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
