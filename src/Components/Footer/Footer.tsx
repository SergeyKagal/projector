import './Footer.scss';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Copyright from '../Copyright.tsx/Copyright';

const Footer = () => {
  return (
    <Box className="footer" component="footer">
      <div className="footer__container">
        <div className="footer__side">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <img className="rs-logo" src="./rs_school_js.svg" alt="rs logo" />

            <Link color="inherit" href="https://rs.school/react/" target="_blank">
              Online course «React developing»
            </Link>
          </Typography>
        </div>

        <div className="footer__side">
          <Copyright />
        </div>
      </div>
    </Box>
  );
};

export default Footer;
