import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

export const CreateNewBoard = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        className="btn"
        color="inherit"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddIcon />
        Add new board
      </Button>
      <Dialog open={open}>
        <DialogTitle>New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>To create new board, please fill all form fields.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => {}}>
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
