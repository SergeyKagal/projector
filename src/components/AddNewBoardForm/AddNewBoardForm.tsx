import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addBoard, getBoards } from '../../api/api';
import { Board } from '../../constants/interfaces';
import './AddNewBoardForm.scss';

interface AddNewBoardFormProps {
  setBoardsArray: (array: Board[]) => void;
  setIsAddBoardFormOpen: (flag: boolean) => void;
}

const AddNewBoardForm = (props: AddNewBoardFormProps) => {
  const token = JSON.parse(localStorage.getItem('user') as string)?.token;

  interface IState {
    title: string;
  }

  const initialState = {
    title: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'The title must be between 3 and 30 characters.')
      .max(30, 'The title must be between 3 and 30 characters.')
      .required('This field is required!'),
  });

  const addNewBoard = async (formValue: IState) => {
    const { title } = formValue;

    await addBoard(token, title);

    const newArray = await getBoards(token);
    props.setBoardsArray(newArray);
    props.setIsAddBoardFormOpen(false);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: addNewBoard,
  });

  return (
    <div className="addNewBoard__container">
      <form onSubmit={formik.handleSubmit} className="addNewBoard__form">
        <Typography component="h1" variant="h5">
          Add title for new board
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
          />
        </Box>
        <Box sx={{ width: '75%', px: 0, py: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => props.setIsAddBoardFormOpen(false)}
            sx={{ margin: '0 10px' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ margin: '0 10px' }}>
            Add board
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddNewBoardForm;
