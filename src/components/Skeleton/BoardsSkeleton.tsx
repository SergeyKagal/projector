import { Card, CardContent, Skeleton } from '@mui/material';
import '../../pages/Main/Main.scss';

const BoardsSkeleton = () => {
  const cardsCount = 7;

  return (
    <div className="boards__container">
      {[...Array(cardsCount)].map((e, i) => (
        <Card
          key={i}
          className="boards__card"
          sx={{
            backgroundColor: '#6a93e8',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pt: '25px' }}>
            <Skeleton animation="wave" height={10} width="100%" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BoardsSkeleton;
