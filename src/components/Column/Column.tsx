import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IColumn } from '../../constants/interfaces';
import './Column.scss';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IColumnProps {
  column: IColumn;
  setColumnToDelete: (column: IColumn) => void;
  setShowConfirmPopUp: (flag: boolean) => void;
}

const Column = (props: IColumnProps) => {
  const [editTitleMode, setEditTitleMode] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, column: IColumn) => {
    event.stopPropagation();
    props.setColumnToDelete(column);
    props.setShowConfirmPopUp(true);
  };

  const handleTitleClick = () => {
    setEditTitleMode(true);
  };

  const editColumnTitle = () => {};

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'The title must be between 3 and 15 characters.')
      .max(15, 'The title must be between 3 and 15 characters.')
      .required('This field is required!'),
  });

  const formik = useFormik({
    initialValues: { title: props.column.title },
    validationSchema: validationSchema,
    onSubmit: editColumnTitle,
  });

  return (
    <Container className="column">
      <div className="column__title" onClick={handleTitleClick}>
        {props.column.title}
        <Button
          sx={{ p: '0px', minWidth: '' }}
          onClick={(event) => handleClick(event, props.column)}
        >
          {<DeleteIcon />}
        </Button>

        {editTitleMode && (
          <div className="column__title_edit">
            <form onSubmit={formik.handleSubmit} className="title-edit__form">
              <Box sx={{ width: '75%', px: 0, py: 2 }}>
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Box>
              {/* <Box sx={{ width: '75%', px: 0, py: 2, display: 'flex', justifyContent: 'center' }}>
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
              </Box> */}
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
