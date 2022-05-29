import { Skeleton } from '@mui/material';
import './ColumnSkeleton.scss';

const ColumnSkeleton = () => {
  return (
    <div className="all-skeletons">
      <div className="column-skeleton">
        <div className="skeleton-header">
          <Skeleton animation="wave" height={10} width="80%" />
          <Skeleton
            animation="wave"
            width={25}
            height={28}
            variant="rectangular"
            style={{ marginBottom: 6 }}
          />
        </div>
        <Skeleton
          sx={{ height: 71, m: '14px 0 20px 0', width: '99%' }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
      </div>
      <div className="column-skeleton">
        <div className="skeleton-header">
          <Skeleton animation="wave" height={10} width="80%" />
          <Skeleton
            animation="wave"
            width={25}
            height={28}
            variant="rectangular"
            style={{ marginBottom: 6 }}
          />
        </div>
        <Skeleton
          sx={{ height: 71, m: '14px 0 20px 0', width: '99%' }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
      </div>
      <div className="column-skeleton">
        <div className="skeleton-header">
          <Skeleton animation="wave" height={10} width="80%" />
          <Skeleton
            animation="wave"
            width={25}
            height={28}
            variant="rectangular"
            style={{ marginBottom: 6 }}
          />
        </div>
        <Skeleton
          sx={{ height: 71, m: '14px 0 20px 0', width: '99%' }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
      </div>
      <div className="column-skeleton">
        <div className="skeleton-header">
          <Skeleton animation="wave" height={10} width="80%" />
          <Skeleton
            animation="wave"
            width={25}
            height={28}
            variant="rectangular"
            style={{ marginBottom: 6 }}
          />
        </div>
        <Skeleton
          sx={{ height: 71, m: '14px 0 20px 0', width: '99%' }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
      </div>
      <div className="column-skeleton">
        <div className="skeleton-header">
          <Skeleton animation="wave" height={10} width="80%" />
          <Skeleton
            animation="wave"
            width={25}
            height={28}
            variant="rectangular"
            style={{ marginBottom: 6 }}
          />
        </div>
        <Skeleton
          sx={{ height: 71, m: '14px 0 20px 0', width: '99%' }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
      </div>
    </div>
  );
};

export default ColumnSkeleton;
