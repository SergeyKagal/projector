import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="right">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/SergeyKagal" target="_blank">
        Sergey Kagal
      </Link>
      {', '}
      {'© '}
      <Link color="inherit" href="https://github.com/ravgusha" target="_blank">
        Ravganiyat Suleymanova
      </Link>
      {', '}
      {'© '}
      <Link color="inherit" href="https://github.com/Elvehnn" target="_blank">
        Elena Shashina
      </Link>
      {', '}
      2022.
    </Typography>
  );
};

export default Copyright;
