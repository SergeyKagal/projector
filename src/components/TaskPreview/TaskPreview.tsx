import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ITask } from '../../constants/interfaces';
import { localizationContent } from '../../localization/types';

const TaskPreview = (props: { task: ITask }) => {
  return (
    <Card
      sx={{
        p: '10px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5px 0',
        cursor: 'pointer',
      }}
    >
      {/* <CardMedia
        component="img"
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
        }}
        image="./avatar_sergey.png"
        alt="avatar sergey"
      /> */}

      <Typography variant="h5">{props.task.title}</Typography>
    </Card>
  );
};

export default TaskPreview;
