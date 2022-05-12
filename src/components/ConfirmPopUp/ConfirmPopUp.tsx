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
  toShowPopUp: (isShow: boolean) => void;
  onConfirm?: () => void;
  child?: JSX.Element;
  description: string;
}

const ConfirmPopUp = (props: IConfirm) => {
  const cancelClickHandler = () => {
    props.toShowPopUp(false);
  };

  return (
    <>
      <Dialog open={props.isOpen}>
        <DialogTitle color="error">Delete Confirmation</DialogTitle>
        <DialogContent>
          {props.child}
          <DialogContentText>{props.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cancelClickHandler}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={props.onConfirm}>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmPopUp;
