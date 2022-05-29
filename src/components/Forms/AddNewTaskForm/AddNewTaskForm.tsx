import './AddNewTaskForm.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addTask, getBoardById, getUsers } from '../../../api/api';
import { IBoard, IColumn } from '../../../constants/interfaces';
import { notify } from '../../Notification/Notification';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { localizationContent } from '../../../localization/types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

interface addNewTaskProps {
  setColumnToAddTask: (column: IColumn | null) => void;
  setBoard: (board: IBoard) => void;
  boardId: string;
  column: IColumn;
}

interface User {
  id: string;
  name: string;
  login: string;
}

const AddNewTaskForm = (props: addNewTaskProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const initialState = {
    title: '',
    description: '',
    user: '',
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
    user: Yup.string().required('This field is required!'),
  });

  const addNewTask = async (formValue: IState) => {
    const newTask = {
      title: formValue.title,
      description: formValue.description,
      userId: formValue.user,
      boardId: props.boardId,
      columnId: props.column.id,
    };

    setIsLoading(true);

    try {
      await addTask(props.boardId, props.column.id, newTask).then((res) => {
        notify(`${localizationContent.task} ${res.title} ${localizationContent.added[0]}`);
      });
      const newBoard = await getBoardById(props.boardId);
      newBoard.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
      if (newBoard) {
        props.setBoard(newBoard);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    } finally {
      setIsLoading(false);
      props.setColumnToAddTask(null);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: addNewTask,
  });

  return (
    <div className="addNewTask__container">
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={formik.handleSubmit} className="addNewTask__form">
          <Typography component="h1" variant="h5">
            {localizationContent.addNewTask.header}
          </Typography>
          <Box sx={{ px: 0, py: 2 }}>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id="title"
              name="title"
              label={localizationContent.addNewTask.title}
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
              label={localizationContent.addNewTask.description}
              type="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <FormControl
              fullWidth
              sx={{ mt: 2 }}
              error={formik.touched.user && Boolean(formik.errors.user)}
            >
              <InputLabel id="demo-simple-select-label">
                {localizationContent.addNewTask.user}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="user"
                id="demo-simple-select"
                value={formik.values.user}
                label={localizationContent.addNewTask.user}
                onChange={formik.handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
                <FormHelperText>{formik.touched.user && formik.errors.user}</FormHelperText>
              </Select>
            </FormControl>
          </Box>

          <Grid container sx={{ width: 'inherit', mt: 2 }}>
            <Grid item xs>
              <Button
                variant="outlined"
                onClick={() => props.setColumnToAddTask(null)}
                sx={{ margin: '10px' }}
              >
                {localizationContent.buttons.cancel}
              </Button>
            </Grid>
            <Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ margin: '10px' }}
                disabled={isLoading}
              >
                {localizationContent.buttons.add}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default AddNewTaskForm;
