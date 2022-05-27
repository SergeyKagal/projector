import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { signIn, editProfile, deleteUser, getUserData } from '../../../api/api';
import { getUserInformation, GlobalContext } from '../../../provider/provider';
import Notification, { notify } from '../../Notification/Notification';
import ConfirmPopUp from '../../ConfirmPopUp/ConfirmPopUp';
import { signOut } from '../../../api/api';
import { PATH } from '../../../constants/paths';
import theme from '../../../constants/theme';
import { localizationContent } from '../../../localization/types';

export const EditProfile = () => {
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

  interface IUser {
    id?: string;
    name?: string;
    password?: string;
    login?: string;
  }

  const { userState, setUserState } = useContext(GlobalContext);
  const [state, setState] = useState<IState>(initialState);
  const [deletePopUp, setDelete] = useState(false);
  const [userData, setUserData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  const id = userState.userId || '';

  useEffect(() => {
    getUserData(id).then((response) => setUserData(response));
  }, [id, state]);

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

  function handleEdit(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;
    setState({
      ...state,
      successful: false,
    });

    editProfile(username, email, password, id).then(
      () => {
        setIsLoading(true);
        signIn(email, password);
        setState({
          ...state,
          successful: true,
        });
        setUserState(getUserInformation());
        notify(localizationContent.accSettings.succes);
        formik.resetForm();
        setIsLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setState({ ...state, successful: false });
        notify(resMessage);
        setIsLoading(false);
      }
    );
  }

  function handleDelete() {
    deleteUser(id).then(() => {
      signOut();
      setUserState(getUserInformation());
      setDelete(false);
    });
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: handleEdit,
  });

  if (!userState.isUserSignIn) {
    return <Navigate to={PATH.BASE_URL} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '100vh',
          height: '100%',
        }}
      >
        <Button sx={{ position: 'absolute', top: '0', left: '0' }} onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon sx={{ fontSize: '66px' }} />
        </Button>
        <Typography
          component="h1"
          variant="h5"
          sx={{ width: '100%', alignSelf: 'end', textAlign: 'center' }}
        >
          {localizationContent.accSettings.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Card
            sx={{
              maxWidth: 545,
              height: '377px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              bgcolor: 'transparent',
              mr: '15px',
            }}
          >
            <AccountCircleIcon sx={{ color: 'primary.main', m: 1, fontSize: '154px' }} />
            <CardContent sx={{ pt: '0', textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {userData ? userData.name : null}
              </Typography>
              <Typography sx={{ pb: 3 }} variant="h6" color="primary.main">
                {userData ? userData.login : null}
              </Typography>
              <Divider />
              <Typography component="h3" variant="subtitle2" color="text.secondary" sx={{ pt: 3 }}>
                {localizationContent.accSettings.discription}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: 'transparent',
              px: '25px',
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContext: 'space-between',
                }}
              >
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
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  {localizationContent.buttons.save}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  color="error"
                  onClick={() => {
                    setDelete(true);
                  }}
                >
                  {localizationContent.buttons.delAcc}
                </Button>
              </Box>
            </form>
            {
              <ConfirmPopUp
                description={`Are you sure to delete account?`}
                isOpen={deletePopUp}
                toShowPopUp={setDelete}
                onConfirm={() => {
                  handleDelete();
                }}
              />
            }
          </Card>
        </Box>
        <Notification />
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
