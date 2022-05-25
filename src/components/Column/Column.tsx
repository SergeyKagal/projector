import { Draggable } from 'react-beautiful-dnd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IBoard, IColumn, ITask } from '../../constants/interfaces';
import './Column.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { getBoardById, updateColumn } from '../../api/api';
import TaskPreview from '../TaskPreview/TaskPreview';
import { Typography } from '@mui/material';
import { localizationContent } from '../../localization/types';
import axios from 'axios';
import Notification, { notify } from '../Notification/Notification';

interface IColumnProps {
  board: IBoard;
  column: IColumn;
  color: string;
  index: number;
  setColumnToDelete: (column: IColumn) => void;
  setShowConfirmPopUp: (flag: boolean) => void;
  setBoard: (board: IBoard) => void;
  setColumnToAddTask: (column: IColumn | null) => void;
  setTaskToEdit: (task: ITask | null) => void;
  setTaskToDelete: (task: ITask | null) => void;
}

interface IState {
  title: string;
}

const Column = (props: IColumnProps) => {
  const [editTitleMode, setEditTitleMode] = useState(false);

  const handleClick = () => {
    props.setColumnToDelete(props.column);
    props.setShowConfirmPopUp(true);
  };

  const editColumnTitle = async (formValue: IState) => {
    const { title } = formValue;
    const updatedColumn = { ...props.column, title: title };

    try {
      await updateColumn(props.board.id, updatedColumn);
      const board = await getBoardById(props.board.id);

      board?.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
      props.setBoard(board);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      setEditTitleMode(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Min 3 char')
      .max(15, 'Max 15 char')
      .required('This field is required!'),
  });

  const formik = useFormik({
    initialValues: { title: props.column.title },
    validationSchema: validationSchema,
    onSubmit: editColumnTitle,
  });

  const handleTitleClick = () => {
    setEditTitleMode(true);
  };

  const handleCancelEditTitle = () => {
    formik.values.title = props.column.title;
    setEditTitleMode(false);
  };

  const styles = {
    backgroundColor: props.color,
  };

  const tasks = props.column.tasks
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .map((task) => (
      <TaskPreview
        key={task.id}
        task={task}
        setTaskToEdit={props.setTaskToEdit}
        column={props.column}
        boardId={props.board.id}
        setTaskToDelete={props.setTaskToDelete}
        setShowConfirmPopUp={props.setShowConfirmPopUp}
      />
    ));

  const columnHeight = document.documentElement.clientHeight - 370;

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          className="column"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ maxHeight: `${columnHeight}px` }}
        >
          <div className="column__header" style={styles}></div>
          <div className="title-container">
            <Typography
              variant="h5"
              color="text.primary"
              className="column__title"
              onClick={() => handleTitleClick()}
            >
              {props.column.title}
              {<EditIcon className="column-edit" />}
            </Typography>

            <Button sx={{ p: '2px', minWidth: '' }} onClick={() => handleClick()}>
              {<DeleteIcon />}
            </Button>

            {editTitleMode && (
              <div className="title-edit">
                <form onSubmit={formik.handleSubmit} className="title-edit__form">
                  <Box
                    sx={{
                      p: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f1',
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      id="title"
                      name="title"
                      value={formik.values.title}
                      autoFocus
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                    <Button
                      aria-label="submit"
                      type="submit"
                      variant="contained"
                      sx={{ width: '32px', height: '32px', minWidth: 0, boxShadow: 'none' }}
                    >
                      <CheckIcon />
                    </Button>

                    <Button
                      aria-label="delete"
                      variant="outlined"
                      sx={{ width: '32px', height: '32px', minWidth: 0, p: '6px 16px' }}
                      onClick={handleCancelEditTitle}
                    >
                      <CloseIcon />
                    </Button>
                  </Box>
                </form>
              </div>
            )}
          </div>

          {tasks}

          <Button
            variant="text"
            className="button-add-item"
            startIcon={<AddIcon />}
            onClick={() => props.setColumnToAddTask(props.column)}
          >
            {localizationContent.buttons.addTask}
          </Button>

          <Notification />
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
