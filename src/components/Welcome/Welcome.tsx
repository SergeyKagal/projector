import './Welcome.scss';
import { PATH } from '../../constants/paths';
import AppBar from '@mui/material/AppBar';
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
import { useContext } from 'react';
import { GlobalContext } from '../../provider/provider';
import { Link as RouterLink } from 'react-router-dom';
import { LangToggler } from '../Header/LangToggler/LangToggler';
import { localizationContent } from '../../localization/types';

const Welcome = () => {
  const { userState } = useContext(GlobalContext);

  return (
    <div className="welcome">
      <AppBar position="relative" className="appBar">
        <Toolbar sx={{ display: { justifyContent: 'flex-end' } }} className="toolbar">
          {userState.isUserSignIn ? (
            <Button color="inherit" component={RouterLink} to={PATH.MAIN_ROUTE}>
              {localizationContent.toMain}
            </Button>
          ) : (
            <Toolbar sx={{ display: { justifyContent: 'flex-end' } }} className="toolbar">
              <Button color="inherit" component={RouterLink} to={PATH.SIGN_IN}>
                {localizationContent.signin}
              </Button>

              <Button color="inherit" component={RouterLink} to={PATH.SIGN_UP}>
                {localizationContent.signup}
              </Button>
            </Toolbar>
          )}
          <LangToggler></LangToggler>
        </Toolbar>
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
              {localizationContent.about}
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
              {localizationContent.team}
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
                    {localizationContent.names[0]}
                  </Typography>
                  <Typography>{localizationContent.jobs[0]}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href="https://github.com/SergeyKagal"
                    target="_blank"
                    sx={{ p: 0 }}
                  >
                    {localizationContent.gitHubLink}
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
                    {localizationContent.names[1]}
                  </Typography>
                  <Typography>{localizationContent.jobs[1]} </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href="https://github.com/ravgusha"
                    target="_blank"
                    sx={{ p: 0 }}
                  >
                    {localizationContent.gitHubLink}
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
                    {localizationContent.names[2]}
                  </Typography>
                  <Typography>{localizationContent.jobs[2]} </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href="https://github.com/elvehnn"
                    target="_blank"
                    sx={{ p: 0 }}
                  >
                    {localizationContent.gitHubLink}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Container>
        </Box>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
