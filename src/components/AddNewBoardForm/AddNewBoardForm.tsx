import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { addBoard, getBoards } from '../../api/api';
import { IBoard } from '../../constants/interfaces';
import { localizationContent } from '../../localization/types';
import { GlobalContext } from '../../provider/provider';
import './AddNewBoardForm.scss';

interface AddNewBoardFormProps {
  setBoardsArray: (array: IBoard[]) => void;
}

const AddNewBoardForm = (props: AddNewBoardFormProps) => {
  const { setIsCreateNewBoardOpen } = useContext(GlobalContext);
  interface IState {
    title: string;
  }

  const initialState = {
    title: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, `${localizationContent.errors.titleLength}`)
      .max(30, `${localizationContent.errors.titleLength}`)
      .required(`${localizationContent.errors.required}`),
  });

  const addNewBoard = async (formValue: IState) => {
    const { title } = formValue;

    await addBoard(title);

    const newArray = await getBoards();
    props.setBoardsArray(newArray);
    setIsCreateNewBoardOpen(false);
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
          {localizationContent.addNewBoard.addTitle}
        </Typography>
        <Box sx={{ width: '75%', px: 0, py: 2 }}>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="title"
            name="title"
            label={localizationContent.addNewBoard.title}
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
            onClick={() => setIsCreateNewBoardOpen(false)}
            sx={{ margin: '0 10px' }}
          >
            {localizationContent.buttons.cancel}
          </Button>
          <Button type="submit" variant="contained" sx={{ margin: '0 10px' }}>
            {localizationContent.buttons.add}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddNewBoardForm;
