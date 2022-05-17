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

const SignOut = () => {
  const { setUserState } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        color="inherit"
        title={localizationContent.signOut}
        onClick={() => {
          setOpen(true);
        }}
      >
        {<LogoutIcon />}
      </Button>
      <Dialog open={open}>
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
            onClick={() => {
              handleClose();
              signOut();
              setUserState(getUserInformation());
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
