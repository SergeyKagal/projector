import './AddNewTaskForm.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addColumn, getBoardById } from '../../api/api';
import { IBoard } from '../../constants/interfaces';
import { notify } from '../Notification/Notification';

interface addNewTaskProps {
  setAddNewTaskFormOpen: (flag: boolean) => void;
}

const AddNewTaskForm = (props: addNewTaskProps) => {
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
  });

  const addNewTask = async (formValue: IState) => {
    // try {
    //   const { title } = formValue;
    //   await addColumn(props.board.id, title, props.board.columns.length + 1);
    //   const newBoard = await getBoardById(props.board.id);
    //   if (newBoard) {
    //     props.setBoard(newBoard);
    //   }
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     const resMessage = error.message || error.toString();
    //     notify(resMessage);
    //   }
    // } finally {
    //   props.setIsAddColumnFormOpen(false);
    // }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: addNewTask,
  });

  return (
    <div className="addNewTask__container">
      <form onSubmit={formik.handleSubmit} className="addNewTask__form">
        <Typography component="h1" variant="h5">
          Add title for new task
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
        </Box>
        <Box sx={{ width: '75%', px: 0, py: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => props.setAddNewTaskFormOpen(false)}
            sx={{ margin: '0 10px' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ margin: '0 10px' }}>
            Add Task
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddNewTaskForm;
