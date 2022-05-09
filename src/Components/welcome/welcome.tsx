import theme from '../../constants/theme';
import './Welcome.scss';
import { MAIN_ROUTE, SIGN_IN, SIGN_UP } from '../../constants/paths';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Footer from '../Footer/Footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const Welcome = () => {
  // const token = window.localStorage.getItem('token') || '';

  const token = true;

  return (
    <ThemeProvider theme={theme}>
      <div className="welcome">
        <AppBar position="relative">
          {token ? (
            <Toolbar sx={{ display: { justifyContent: 'flex-end' } }} className="Toolbar">
              <Button color="inherit" href={MAIN_ROUTE}>
                Go to Main Page
              </Button>
            </Toolbar>
          ) : (
            <Toolbar sx={{ display: { justifyContent: 'flex-end' } }} className="Toolbar">
              <Button color="inherit" href={SIGN_IN}>
                Sign in
              </Button>
              <Button color="inherit" href={SIGN_UP}>
                Sign up
              </Button>
            </Toolbar>
          )}
        </AppBar>

        <main className="main">
          <Box
            sx={{
              pt: 6,
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
                создан помогать эффективному выполнению <br></br>поставленных задач командам
                <br></br> и индивидуальным пользователям
              </Typography>
            </Container>
          </Box>

          <Box
            sx={{
              width: '80%',
              maxWidth: '1200px',
            }}
          >
            <Container sx={{ py: 4 }}>
              <Typography variant="h4" align="center" color="text.secondary" paragraph>
                {`Our team:`}
              </Typography>
              <div className="cards-container">
                <Card
                  sx={{
                    p: '10px',
                    height: '100%',
                    width: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    margin: '0 20px',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                    }}
                    image="./avatar_sergey.png"
                    alt="avatar sergey"
                  />
                  <CardContent sx={{ flexGrow: 1, p: '10px' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Sergey
                    </Typography>
                    <Typography>Project build. CI/CD.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href="https://github.com/SergeyKagal"
                      target="_blank"
                      sx={{ p: 0 }}
                    >
                      View Github
                    </Button>
                  </CardActions>
                </Card>

                <Card
                  sx={{
                    p: '10px',
                    height: '100%',
                    width: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    margin: '0 20px',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                    }}
                    image="./avatar_raya.png"
                    alt="avatar raya"
                  />
                  <CardContent sx={{ flexGrow: 1, p: '10px' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Ravganiyat
                    </Typography>
                    <Typography>Authorization. </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href="https://github.com/ravgusha"
                      target="_blank"
                      sx={{ p: 0 }}
                    >
                      View Github
                    </Button>
                  </CardActions>
                </Card>

                <Card
                  sx={{
                    p: '10px',
                    height: '100%',
                    width: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    margin: '0 20px',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                    }}
                    image="./avatar_elena.png"
                    alt="avatar elena"
                  />
                  <CardContent sx={{ flexGrow: 1, p: '10px' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Elena
                    </Typography>
                    <Typography>Welcome page </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href="https://github.com/elvehnn"
                      target="_blank"
                      sx={{ p: 0 }}
                    >
                      View Github
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Container>
          </Box>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Welcome;
