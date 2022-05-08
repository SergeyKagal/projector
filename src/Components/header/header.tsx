import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Header = () => {
  return (
    <>
      <nav style={{ position: 'sticky' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                Projector
              </Typography>
              <Button color="inherit">welcome</Button>
              <Button color="inherit">main</Button>
              <Button color="inherit">board</Button>
              <Button color="inherit">Login / Sign Up</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </nav>

      <div style={{ backgroundColor: 'gray', height: '2000px', width: '100vw' }}></div>
    </>
  );
};
