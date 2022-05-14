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

const SignOut = () => {
  const { setUserState } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        color="inherit"
        title="Sign Out"
        onClick={() => {
          setOpen(true);
        }}
      >
        {<LogoutIcon />}
      </Button>
      <Dialog open={open}>
        <DialogTitle sx={{ textAlign: 'center' }}>Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to sign out?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              signOut();
              setUserState(getUserInformation());
            }}
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOut;
