import { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '../../api/api';
import { getUserInformation, GlobalContext } from '../../provider/provider';
import { localizationContent } from '../../localization/types';
import { PATH } from '../../constants/paths';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const { setUserState } = useContext(GlobalContext);
  const [isModalOpen, setisModalOpen] = useState(false);
  const handleClose = () => setisModalOpen(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        color="inherit"
        title={localizationContent.signOut}
        onClick={() => {
          setisModalOpen(true);
        }}
      >
        {<LogoutIcon />}
      </Button>
      <Dialog open={isModalOpen}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {localizationContent.signOutPopup.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{localizationContent.signOutPopup.description}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleClose}>
            {localizationContent.buttons.cancel}
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              handleClose();
              signOut();
              setUserState(getUserInformation());
              navigate(PATH.BASE_URL);
            }}
          >
            {localizationContent.buttons.signOut}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOut;
