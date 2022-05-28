import './Welcome.scss';
import { PATH } from '../../constants/paths';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Footer from '../../components/Footer/Footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useContext } from 'react';
import { GlobalContext } from '../../provider/provider';
import { Link as RouterLink } from 'react-router-dom';
import { LangToggler } from '../../components/Header/LangToggler/LangToggler';
import { localizationContent } from '../../localization/types';
import { team } from '../../constants/team';

const Welcome = () => {
  const { userState, stickyHeader } = useContext(GlobalContext);

  return (
    <div className="welcome">
      <AppBar
        position="fixed"
        className="appBar"
        style={
          stickyHeader
            ? { height: '50px', transition: '0.5s' }
            : { height: '77px', transition: '0.5s' }
        }
      >
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
          <LangToggler isDesktopMode={true} />
        </Toolbar>
      </AppBar>

      <main className="main">
        <Box
          sx={{
            py: 6,
            width: '100%',
          }}
        >
          <Container
            maxWidth="md"
            sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
          >
            <Typography
              component="h1"
              color="text.primary"
              sx={{ position: 'absolute', width: '1px', height: '1px', top: -10, left: -10 }}
            >
              Projector
            </Typography>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img className="main__logo" src="/projector_logo.svg" />

              <Typography
                variant="h4"
                align="center"
                color="text.secondary"
                paragraph
                sx={{ display: 'flex', justifyContent: 'center', width: '70%' }}
              >
                {localizationContent.about}
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            width: '80%',
            maxWidth: '1200px',
            pt: '25px',
          }}
        >
          <Typography variant="h4" align="center" color="text.secondary" paragraph>
            {localizationContent.team}
          </Typography>
          <div className="cards-container">
            {team.map((teamMate, i) => {
              return (
                <div key={teamMate.id}>
                  <Card
                    sx={{
                      p: '10px',
                      height: '290px',
                      width: '190px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                      }}
                      image={teamMate.avatarLink}
                      alt={`avatar ${localizationContent.names[i]}`}
                    />
                    <CardContent sx={{ flexGrow: 1, p: '10px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {localizationContent.names[i]}
                      </Typography>
                      <Typography variant="h6">{localizationContent.jobs[i]}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        href={teamMate.gitHubLink}
                        target="_blank"
                        sx={{ p: 0, height: '18px' }}
                      >
                        {localizationContent.gitHubLink}
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </div>
        </Box>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
