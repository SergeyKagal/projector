import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IBoard, IColumn } from '../../constants/interfaces';
import './Column.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { getBoardById, updateColumn } from '../../api/api';
interface IColumnProps {
  board: IBoard;
  column: IColumn;
  color: string;
  setColumnToDelete: (column: IColumn) => void;
  setShowConfirmPopUp: (flag: boolean) => void;
  setBoard: (board: IBoard) => void;
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

    await updateColumn(props.board.id, updatedColumn);
    props.setBoard(await getBoardById(props.board.id));
    setEditTitleMode(false);
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

  return (
    <Container className="column">
      <div className="column__header" style={styles}></div>
      <div className="title-container">
        <div className="column__title" onClick={() => handleTitleClick()}>
          {props.column.title}
        </div>
        <Button sx={{ p: '0px', minWidth: '' }} onClick={() => handleClick()}>
          {<DeleteIcon />}
        </Button>

        {editTitleMode && (
          <div className="title-edit">
            <form onSubmit={formik.handleSubmit} className="title-edit__form">
              <Box sx={{ p: 0, display: 'flex', justifyContent: 'center' }}>
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

      <Button variant="text" className="button-add-item" startIcon={<AddIcon />}>
        ADD TASK
      </Button>
    </Container>
  );
};

export default Column;
