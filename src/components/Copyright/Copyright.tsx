import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = () => {
  return (
    <div>
      <Typography
        variant="body2"
        color="text.secondary"
        align="right"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        Copyright ©
        <Link color="inherit" href="https://github.com/SergeyKagal" target="_blank">
          Sergey Kagal
        </Link>
        , ©
        <Link color="inherit" href="https://github.com/ravgusha" target="_blank">
          Ravganiyat Suleymanova
        </Link>
        , ©
        <Link color="inherit" href="https://github.com/Elvehnn" target="_blank">
          Elena Shashina
        </Link>
        , 2022.
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="right"
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Link color="inherit" href="https://github.com/SergeyKagal" target="_blank">
          ©Sergey
        </Link>
        <Link color="inherit" href="https://github.com/ravgusha" target="_blank">
          , ©Ravganiyat
        </Link>
        <Link color="inherit" href="https://github.com/Elvehnn" target="_blank">
          , ©Elena
        </Link>
        , 2022.
      </Typography>
    </div>
  );
};

export default Copyright;
