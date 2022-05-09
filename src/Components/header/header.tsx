import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <nav style={{ position: 'sticky' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {' '}
              <Link to="/">
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                  Projector
                </Typography>
              </Link>
              <Link to="/">
                <Button color="inherit">welcome</Button>
              </Link>
              <Link to="/main">
                <Button color="inherit">main</Button>
              </Link>
              <Link to="/">
                <Button color="inherit">board</Button>
              </Link>
              <Link to="/">
                <Button color="inherit">Sign In</Button>
              </Link>
              <Link to="/">
                <Button color="inherit">Sign Up</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </nav>

      <div style={{ backgroundColor: 'gray', height: '2000px', width: '100%' }}></div>
    </>
  );
};
