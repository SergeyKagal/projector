import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { addBoard, getBoards } from '../../api/api';
import { PATH } from '../../constants/paths';
import { localizationContent } from '../../localization/types';
import { GlobalContext } from '../../provider/provider';
import ConfirmRedirection from '../ConfirmRedirection/ConfirmRedirection';
import { notify } from '../Notification/Notification';
import './AddNewBoardForm.scss';

const AddNewBoardForm = () => {
  const params = useParams<{ id: string }>().id || '';
  const navigate = useNavigate();
  const { setIsCreateNewBoardOpen, setBoardsArray } = useContext(GlobalContext);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);

  interface IState {
    title: string;
    description: string;
  }

  const initialState = {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, `${localizationContent.errors.titleLength}`)
      .max(30, `${localizationContent.errors.titleLength}`)
      .required(`${localizationContent.errors.required}`),
    description: Yup.string()
      .min(3, `${localizationContent.errors.descriptionLength}`)
      .max(100, `${localizationContent.errors.descriptionLength}`)
      .required(`${localizationContent.errors.required}`),
  });

  const addNewBoard = async (formValue: IState) => {
    const { title, description } = formValue;

    try {
      await addBoard(title, description);

      const newArray = await getBoards();
      setBoardsArray(newArray);

      if (params) {
        setShowConfirmPopUp(true);
        return;
      }

      setIsCreateNewBoardOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resMessage = error.message || error.toString();
        notify(resMessage);
      }
    }
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
            autoFocus
          />
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="description"
            name="description"
            label={localizationContent.addNewBoard.description}
            type="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            multiline
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

      {params && (
        <ConfirmRedirection
          description={`Do you want to go to the main page?`}
          isOpen={isShowConfirmPopUp}
          toShowPopUp={setShowConfirmPopUp}
          onCancel={() => {
            setIsCreateNewBoardOpen(false);
            setShowConfirmPopUp(false);
          }}
          onConfirm={() => {
            setIsCreateNewBoardOpen(false);
            setShowConfirmPopUp(false);
            navigate(PATH.MAIN_ROUTE);
          }}
        />
      )}
    </div>
  );
};

export default AddNewBoardForm;
