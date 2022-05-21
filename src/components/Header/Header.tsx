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
import { GlobalContext } from '../../provider/provider';
import { useContext } from 'react';
import { localizationContent } from '../../localization/types';

interface IHeaderProps {
  setMainPageBgr?: () => void;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const { stickyHeader } = useContext(GlobalContext);
  return (
    <>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            style={
              stickyHeader
                ? { height: '50px', transition: '0.5s' }
                : { height: '77px', transition: '0.5s' }
            }
          >
            <Toolbar style={{ minHeight: '50px' }}>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                <Button className="logo" color="inherit" component={RouterLink} to={PATH.BASE_URL}>
                  Projector
                </Button>
              </Typography>
              <nav className="headerNav">
                {window.location.pathname === '/main' && (
                  <Button color="inherit" onClick={props.setMainPageBgr}>
                    {localizationContent.changeBgr}
                  </Button>
                )}
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
