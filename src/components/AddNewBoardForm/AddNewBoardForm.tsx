import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { addBoard, getBoards } from '../../api/api';
import { Board } from '../../constants/interfaces';
import { token } from '../../constants/mockValues';
import { GlobalContext } from '../../provider/provider';

const AddNewBoardForm = (props: { setBoardsArray: (array: Board[]) => void }) => {
  const { setIsAddBoardFormOpen } = useContext(GlobalContext);

  interface IState {
    title: string;
  }

  const initialState = {
    title: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'The title must be between 3 and 40 characters.')
      .max(40, 'The title must be between 3 and 20 characters.')
      .required('This field is required!'),
  });

  const addNewBoard = async (formValue: IState) => {
    const { title } = formValue;
    await addBoard(token, title);
    const newArray = await getBoards(token);
    props.setBoardsArray(newArray);

    setIsAddBoardFormOpen(false);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: addNewBoard,
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContext: 'center',
        position: 'fixed',
        top: '0px',
        left: '0px',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContext: 'space-between',
          }}
        >
          <Typography component="h1" variant="h5">
            Add title for new board
          </Typography>
          <Box sx={{ px: 0, py: 2 }}>
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
          <Button variant="outlined" onClick={() => setIsAddBoardFormOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add board
          </Button>
        </Box>
      </form>
      {/* <Notification /> */}
    </Container>
  );
};

export default AddNewBoardForm;
