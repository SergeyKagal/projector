import './TaskPreview.scss';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { IColumn, ITask } from '../../constants/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from '../../provider/provider';
import Notification, { notify } from '../Notification/Notification';
import { Draggable } from 'react-beautiful-dnd';
import { localizationContent } from '../../localization/types';
interface TaskPreviewProps {
  setTaskToEdit: (taskID: ITask) => void;
  setTaskToDelete: (taskID: ITask) => void;
  setShowConfirmPopUp: (flag: boolean) => void;
  column: IColumn;
  task: ITask;
  index: number;
  boardId: string;
}

const TaskPreview = (props: TaskPreviewProps) => {
  const { userState } = useContext(GlobalContext);

  const handleDeleteTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (props.task.userId === userState.userId) {
      const taskToDelete = { ...props.task, columnId: props.column.id, boardId: props.boardId };

      props.setTaskToDelete(taskToDelete);
      props.setShowConfirmPopUp(true);
    } else {
      notify(localizationContent.errors.forbidToDeleteTask);
    }
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task"
          sx={{
            p: '10px',
            width: '93%',
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
          <Notification />
        </Card>
      )}
    </Draggable>
  );
};

export default TaskPreview;
