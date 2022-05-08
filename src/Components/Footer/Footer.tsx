import './Footer.scss';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Copyright from '../Copyright.tsx/Copyright';

const Footer = () => {
  return (
    <Box
      sx={{ bgcolor: 'background.paper', py: 6, width: '100%', justifyContent: 'space-between' }}
      component="footer"
    >
      {/* <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography> */}
      {/* <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Something here to give the footer a purpose!
      </Typography> */}
      <Copyright />
      <Typography variant="body2" color="text.secondary" align="center">
        {/* <IconButton aria-label="rs-logo" sx={{ height: '30px' }}> */}
        <img className="rs-logo" src="./rs_school_js.svg" alt="rs logo" />
        {/* </IconButton> */}

        <Link color="inherit" href="https://rs.school/react/" target="_blank">
          Online course «React developing»
        </Link>
        {', '}
      </Typography>
    </Box>
  );
};

export default Footer;
