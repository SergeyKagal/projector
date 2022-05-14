import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addColumn, getBoardById } from '../../api/api';
import { IBoard } from '../../constants/interfaces';
import './AddNewColumnForm.scss';

interface addNewColumnProps {
  setIsAddColumnFormOpen: (flag: boolean) => void;
  setBoard: (board: IBoard) => void;
  board: IBoard;
}

const AddNewColumnForm = (props: addNewColumnProps) => {
  interface IState {
    title: string;
  }

  const initialState = {
    title: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'The title must be between 3 and 15 characters.')
      .max(15, 'The title must be between 3 and 15 characters.')
      .required('This field is required!'),
  });

  const addNewColumn = async (formValue: IState) => {
    const { title } = formValue;

    await addColumn(props.board.id, title, props.board.columns.length);

    const newBoard = await getBoardById(props.board.id);
    if (newBoard) {
      props.setBoard(newBoard);
    }
    props.setIsAddColumnFormOpen(false);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: addNewColumn,
  });

  return (
    <div className="addNewColumn__container">
      <form onSubmit={formik.handleSubmit} className="addNewColumn__form">
        <Typography component="h1" variant="h5">
          Add title for new column
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
            onClick={() => props.setIsAddColumnFormOpen(false)}
            sx={{ margin: '0 10px' }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ margin: '0 10px' }}>
            Add column
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddNewColumnForm;