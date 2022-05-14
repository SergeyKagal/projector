import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { PATH } from '../../constants/paths';
import theme from '../../constants/theme';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signIn, editProfile } from '../../api/api';
import { getUserInformation, GlobalContext } from '../../provider/provider';
import * as Yup from 'yup';
import Notification, { notify } from '../Notification/Notification';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const EditProfile = () => {
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

  const navigate = useNavigate();
  const { userState, setUserState } = useContext(GlobalContext);
  const [state, setState] = useState<IState>(initialState);
  const id = userState.userId || '';
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

  function handleEdit(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;
    setState({
      ...state,
      successful: false,
    });

    editProfile(username, email, password, id).then(
      () => {
        signIn(email, password);
        setState({
          ...state,
          successful: true,
        });
        setUserState(getUserInformation());
        notify('Success');
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setState({ ...state, successful: false });
        notify(resMessage);
      }
    );
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleEdit,
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
          minHeight: '100vh',
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
              Accout Settings
            </Typography>
            <Typography component="h3" variant="subtitle2" sx={{ pt: 1 }}>
              To Edit Profile, please change content of all form fields.
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
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Edit profile
            </Button>
          </Box>
        </form>
        <Notification />
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
