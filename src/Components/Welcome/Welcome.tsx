import theme from '../../constants/theme';
import { SIGN_IN, SIGN_UP } from '../../constants/paths';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Footer from '../Footer/Footer';

const Welcome = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="welcome">
        <AppBar position="relative">
          <Toolbar>
            <Button color="inherit" href={SIGN_IN}>
              Sign in
            </Button>
            <Button color="inherit" href={SIGN_UP}>
              Sign up
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              // bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Projector
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                создан помогать эффективно справляться <br></br>с поставленными задачами как
                командам,<br></br> так и индивидуальным пользователям
              </Typography>
            </Container>
          </Box>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
export default Welcome;
