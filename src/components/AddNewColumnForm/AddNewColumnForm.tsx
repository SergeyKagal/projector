import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { addColumn, getBoardById } from '../../api/api';
import { IBoard, IColumn } from '../../constants/interfaces';
import { localizationContent } from '../../localization/types';
import { notify } from '../Notification/Notification';
import './AddNewColumnForm.scss';
import { Color, ColorResult, CompactPicker, CirclePicker, ChromePicker } from 'react-color';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

interface addNewColumnProps {
  setIsAddColumnFormOpen: (flag: boolean) => void;
  setBoard: (board: IBoard) => void;
  board: IBoard;
}

const AddNewColumnForm = (props: addNewColumnProps) => {
  const [color, setColor] = useState('#ff0000');
  interface IState {
    title: string;
    // color?: string;
  }

  const initialState = {
    title: '',
    // color: '#ff0000',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'The title must be between 3 and 15 characters.')
      .max(15, 'The title must be between 3 and 15 characters.')
      .required('This field is required!'),
  });

  const addNewColumn = async (formValue: IState) => {
    try {
      const { title } = formValue;
      console.log(formValue);

      await addColumn(props.board.id, title.toUpperCase());

      const newBoard = await getBoardById(props.board.id);
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
      props.setIsAddColumnFormOpen(false);
    }
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
          {localizationContent.addColumn.header}
        </Typography>
        <Box sx={{ width: '75%', px: 0, py: 2 }}>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="title"
            name="title"
            label={localizationContent.addColumn.title}
            type="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            autoFocus
          />

          <ChromePicker
            color={color}
            onChange={(color) => {
              console.log(color);
              setColor(color.hex);
            }}
          />
        </Box>
        <Box sx={{ width: '75%', px: 0, py: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => props.setIsAddColumnFormOpen(false)}
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

export default AddNewColumnForm;
