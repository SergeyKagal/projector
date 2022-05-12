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
  isOpen: boolean;
  closeConfirmModal: (isNotOpen: boolean) => void;
  onDelete?: () => void;
}

const ConfirmDelete = (props: IConfirm) => {
  const cancelHandler = () => {
    props.closeConfirmModal(false);
  };

  return (
    <>
      <Dialog open={props.isOpen}>
        <DialogTitle color="error">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you shure ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cancelHandler}>
            Cancel
          </Button>

          <Button color="error" variant="contained" onClick={props.onDelete}>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDelete;
