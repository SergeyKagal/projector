import { Card, Skeleton } from "@mui/material";

const TitleSkeleton = () => {
  return (
    <Card
      sx={{
        width: '300px',
        height: '32px',
        overflow: 'unset',
        mt: '18px',
        opacity: 0.9,
        boxShadow: 'none',
        p: '16px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Skeleton animation="wave" height={10} width="100%" />
    </Card>
  );
};

export default TitleSkeleton;
