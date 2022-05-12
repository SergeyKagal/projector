import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as paths from '../../constants/paths';
import LogoutIcon from '@mui/icons-material/Logout';
import { LangToggler } from './LangToggler/LangToggler';
import './Header.scss';
import { CreateNewBoard } from './CreateNewBoard/CreateNewBoard';
import { EditProfile } from './EditProfile/EditProfile';
export const Header = () => {
  return (
    <>
      <header style={{ position: 'sticky' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {' '}
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                Projector
              </Typography>
              <nav className="headerNav">
                <Button className="btn" color="inherit" href={paths.BASE_URL}>
                  welcome
                </Button>
                <CreateNewBoard />
                <EditProfile />
                <Button className="btn" color="inherit" href={paths.LOGOUT} title="Log out">
                  {<LogoutIcon />}
                </Button>
                <LangToggler />
              </nav>
            </Toolbar>
          </AppBar>
        </Box>
      </header>

      <div style={{ backgroundColor: 'gray', height: '2000px', width: '100%' }}></div>
    </>
  );
};
