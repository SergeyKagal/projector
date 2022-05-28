import * as React from 'react';
import './Header.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { PATH } from '../../constants/paths';
import { LangToggler } from './LangToggler/LangToggler';
import { CreateNewBoard } from './CreateNewBoard/CreateNewBoard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link as RouterLink } from 'react-router-dom';
import SignOut from '../Authorization/SignOut/SignOut';
import { GlobalContext } from '../../provider/provider';
import { useContext, useState } from 'react';
import { localizationContent } from '../../localization/types';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

interface IHeaderProps {
  setMainPageBgr?: () => void;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const { stickyHeader } = useContext(GlobalContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
            sx={{ justifyContent: 'center' }}
          >
            <Container maxWidth="xl">
              <Toolbar sx={{ minHeight: '50px', justifyContent: 'space-between', p: '0' }}>
                <Button component={RouterLink} to={PATH.BASE_URL}>
                  <img className="logo" src="/projector_logo_white.svg" />
                </Button>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <nav className="headerNav">
                    {window.location.pathname === '/main' && (
                      <Button color="inherit" onClick={props.setMainPageBgr}>
                        {localizationContent.changeBgr}
                      </Button>
                    )}
                    <CreateNewBoard isDesktopMode={true} />
                    <Button color="inherit" component={RouterLink} to={PATH.EDIT_PROFILE}>
                      <ManageAccountsIcon />
                    </Button>
                    <SignOut isDesktopMode={true} />
                    <LangToggler isDesktopMode={true} />
                  </nav>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      p: '10px',
                    }}
                  >
                    {window.location.pathname === '/main' && (
                      <MenuItem onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                        <Button color="inherit" onClick={props.setMainPageBgr}>
                          {localizationContent.changeBgr}
                        </Button>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                      <CreateNewBoard isDesktopMode={false} />
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to={PATH.EDIT_PROFILE}
                        sx={{ gap: '10px' }}
                        fullWidth
                      >
                        <ManageAccountsIcon />
                        {localizationContent.editProfile}
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                      <SignOut isDesktopMode={false} />
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                      <LangToggler isDesktopMode={false} />
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </header>
    </>
  );
};
