import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    text: {
      primary: 'rgba(0, 0, 0, 0.8)',
      secondary: 'rgba(0, 0, 0, 0.7)',
    },
    primary: {
      main: '#6a93e8',
      light: '#87A8EC',
      dark: 'rgb(74, 102, 162)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffa000',
      contrastText: 'rgba(255,255,255,0.87)',
      dark: '#a86b04',
      light: '#f7be5e',
    },
    background: {
      default: '#ffffff',
      paper: '#f0f0f1',
    },
    error: {
      main: '#ff5fa2',
      light: '#f5a5c6',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    warning: {
      main: '#ff5fa2',
      light: '#f5a5c6',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    success: {
      main: '#28ceaa',
      contrastText: 'rgba(253,252,252,0.87)',
    },
    info: {
      main: '#673ab7',
    },
  },
  typography: {
    h4: {
      fontSize: '1.6rem',
    },
    h5: {
      fontSize: '1.3rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
