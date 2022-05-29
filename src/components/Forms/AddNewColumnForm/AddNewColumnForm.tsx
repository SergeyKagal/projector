import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { addColumn, getBoardById } from '../../../api/api';
import { IBoard, IColumn } from '../../../constants/interfaces';
import { localizationContent } from '../../../localization/types';
import { notify } from '../../Notification/Notification';
import './AddNewColumnForm.scss';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import theme from '../../../constants/theme';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

interface addNewColumnProps {
  setIsAddColumnFormOpen: (flag: boolean) => void;
  setBoard: (board: IBoard) => void;
  board: IBoard;
  colors: Map<string, string>;
}

const AddNewColumnForm = (props: addNewColumnProps) => {
  const [color, setColor] = useState(theme.palette.primary.main);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const { title } = formValue;

      const response = await addColumn(props.board.id, title.toUpperCase()).then((res) => {
        notify(`${localizationContent.column} ${res.data.title} ${localizationContent.added[0]}`);
        return res;
      });

      const newBoard = await getBoardById(props.board.id);

      newBoard.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));

      const newColors = props.colors.set(response.data.id, color);

      window.localStorage.setItem(
        `ColorsForBoard#${props.board.id}`,
        JSON.stringify(Object.fromEntries(newColors))
      );

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
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={formik.handleSubmit} className="addNewColumn__form">
          <Typography component="h1" variant="h5">
            {localizationContent.addColumn.header}
          </Typography>

          <Box sx={{ width: '100%', px: 0, pt: 2, pb: 1 }}>
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
          </Box>

          <Box
            sx={{
              pb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p className="color-text">Choose color:</p>
            <CirclePicker
              width={'100%'}
              color={color}
              onChange={(color) => {
                setColor(color.hex);
              }}
            />
          </Box>

          <Grid container sx={{ width: 'inherit', mt: 2 }}>
            <Grid item xs>
              <Button
                variant="outlined"
                onClick={() => props.setIsAddColumnFormOpen(false)}
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

export default AddNewColumnForm;
