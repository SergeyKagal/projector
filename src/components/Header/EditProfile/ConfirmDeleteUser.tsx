import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material';

interface IConfirm {
  open: boolean;
  cancel: (arg0: boolean) => void;
}

const ConfirmDeleteUser = (props: IConfirm) => {
  const cancelHandler = () => {
    props.cancel(false);
  };

  const deleteUser = () => {
    // user deletiong actions.....
  };
  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle color="error">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you shure ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cancelHandler}>
            Cancel
          </Button>

          <Button color="error" variant="contained" onClick={deleteUser}>
            delete user
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteUser;
