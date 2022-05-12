import { createTheme } from '@mui/material/styles';

const themeOptions = {
  
  palette: {
    type: 'light',
    primary: {
      main: '#6a93e8',
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
      main: '#ff1744',
    },
    warning: {
      main: '#ad1457',
    },
    success: {
      main: '#28ceaa',
      contrastText: 'rgba(253,252,252,0.87)',
    },
    info: {
      main: '#673ab7',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
