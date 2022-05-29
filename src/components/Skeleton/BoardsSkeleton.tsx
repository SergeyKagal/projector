import { Card, CardContent, Skeleton } from '@mui/material';
import '../../pages/Main/Main.scss';

const BoardsSkeleton = () => {
  return (
    <main className="boards">
      <Card
        sx={{
          width: '220px',
          mt: '18px',
          my: '30px',
          boxShadow: 'none',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton animation="wave" height={10} width="90%" />
      </Card>

      <div className="boards__container">
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
        <Card
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default BoardsSkeleton;
