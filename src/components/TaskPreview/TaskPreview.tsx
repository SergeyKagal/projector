import './TaskPreview.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IColumn, ITask, IBoard } from '../../constants/interfaces';
import { localizationContent } from '../../localization/types';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

interface TaskPreviewProps {
  setTaskToEdit: (task: ITask) => void;
  // column: IColumn;
  // boardId: string;
  task: ITask;
}

const TaskPreview = (props: TaskPreviewProps) => {
  const editTask = () => {
    // console.log('editTask');
  };

  return (
    <Card
      className="task"
      sx={{
        p: '10px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5px 0',
        cursor: 'pointer',
        backgroundColor: '#fff',
        overflow: 'unset',
        height: '50px',
      }}
      onClick={() => props.setTaskToEdit(props.task)}
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
      <div className="task__title">
        <Typography variant="h6">{props.task.title}</Typography>
        {<EditIcon className="task_edit" />}
      </div>
    </Card>
  );
};

export default TaskPreview;
