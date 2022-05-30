import './Footer.scss';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Copyright from '../Copyright/Copyright';

const Footer = () => {
  return (
    <Box className="footer" component="footer">
      <Box className="footer__container">
        <div className="footer__side">
          <Link
            color="inherit"
            href="https://rs.school/react/"
            target="_blank"
            className="footer__RS-link"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
          >
            <img className="rs-logo" src="/rs_school_js.svg" alt="rs logo" />
            <Typography
              variant="body2"
              color="text.secondary"
              align="left"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Online course «React developing»
            </Typography>
          </Link>
        </div>

        <div className="footer__side">
          <Copyright />
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
