import * as React from 'react';
import './Header.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PATH } from '../../constants/paths';
import { LangToggler } from './LangToggler/LangToggler';
import { CreateNewBoard } from './CreateNewBoard/CreateNewBoard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link as RouterLink } from 'react-router-dom';
import SignOut from '../SignOut/SignOut';

export const Header = () => {
  return (
    <>
      <header style={{ position: 'sticky' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar>
            <Toolbar>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                <Button className="logo" color="inherit" component={RouterLink} to={PATH.BASE_URL}>
                  Projector
                </Button>
              </Typography>
              <nav className="headerNav">
                <CreateNewBoard />
                <Button color="inherit" component={RouterLink} to={PATH.EDIT_PROFILE}>
                  <ManageAccountsIcon />
                </Button>
                <SignOut />
                <LangToggler />
              </nav>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </>
  );
};
