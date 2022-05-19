import './EditTaskForm.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addTask, getBoardById, getUsers, updateTask } from '../../api/api';
import { IBoard, IColumn, ITask } from '../../constants/interfaces';
import { notify } from '../Notification/Notification';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

interface EditTaskProps {
  setBoard: (board: IBoard) => void;
  setTaskToEdit: (task: ITask | null) => void;
  task: ITask;
}

interface User {
  id: string;
  name: string;
  login: string;
}

const EditTaskForm = (props: EditTaskProps) => {
  const [users, setUsers] = useState<User[]>([]);
  console.log(props.task);

  useEffect(() => {
    getUsers().then(
      (response) => {
        setUsers(response);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        notify(resMessage);
      }
    );
  }, []);

  interface IState {
    title: string;
    description: string;
    user: string;
  }

  const defaultUser = users.find((user) => user.id === props.task.userId);

  const initialState = {
    title: props.task.title,
    description: props.task.description,
    user: defaultUser ? defaultUser.name : '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'The title must be between 3 and 15 characters.')
      .max(15, 'The title must be between 3 and 15 characters.')
      .required('This field is required!'),
    description: Yup.string()
      .min(3, 'The description must have min 3 characters.')
      .max(100, 'The description must have max 100 characters.')
      .required('This field is required!'),
  });

  const editTask = async (formValue: IState) => {
    const newTask = {
      title: formValue.title,
      done: false,
      order: props.task.order,
      description: formValue.description,
      userId: formValue.user,
      boardId: props.task.boardId,
      columnId: props.task.columnId,
    };

    // console.log(newTask);

    try {
      await updateTask(newTask);
      const newBoard = await getBoardById(newTask.boardId);
      if (newBoard) {
        props.setBoard(newBoard);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      props.setTaskToEdit(null);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: editTask,
  });

  return (
    <div className="addNewTask__container">
      <form onSubmit={formik.handleSubmit} className="addNewTask__form">
        <Typography component="h1" variant="h5">
          Edit task
        </Typography>
        <Box sx={{ width: '75%', px: 0, py: 2 }}>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="title"
            name="title"
            label="title"
            type="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            autoFocus
          />
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="description"
            name="description"
            label="description"
            type="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">{initialState.user}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="user"
              id="demo-simple-select"
              value={formik.values.user}
              label="user"
              onChange={formik.handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: '75%', px: 0, py: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => props.setTaskToEdit(null)}
            sx={{ margin: '0 10px' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ margin: '0 10px' }}>
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditTaskForm;
