import './TaskPreview.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IColumn, ITask, IBoard } from '../../constants/interfaces';
import { localizationContent } from '../../localization/types';
import EditIcon from '@mui/icons-material/Edit';
import { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { deleteTask } from '../../api/api';

interface TaskPreviewProps {
  setTaskToEdit: (taskID: ITask) => void;
  column: IColumn;
  task: ITask;
  boardId: string;
}

const TaskPreview = (props: TaskPreviewProps) => {
  const handleDeleteTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.setTaskToDelete(props.task.id);
    // await deleteTask(props.boardId, props.column.id, props.task.id);
  };

  return (
    <Card
      className="task"
      sx={{
        p: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: '5px 0',
        cursor: 'pointer',
        backgroundColor: '#fff',
        overflow: 'unset',
        height: '50px',
      }}
      onClick={() => props.setTaskToEdit({ ...props.task, columnId: props.column.id })}
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

        <div className="task__buttons-container">
          <Button
            variant="text"
            sx={{ p: '2px', minWidth: '' }}
            onClick={() => props.setTaskToEdit({ ...props.task, columnId: props.column.id })}
          >
            <EditIcon className="task_edit" />
          </Button>

          <Button
            variant="text"
            sx={{ p: '2px', minWidth: '' }}
            onClick={(event) => handleDeleteTask(event)}
          >
            <CloseIcon className="task_close" />
          </Button>
        </div>
      </div>

      <div className="task__status">{props.task.done ? 'done' : 'in progress'}</div>
    </Card>
  );
};

export default TaskPreview;
