import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ConfirmDeleteUser from './ConfirmDeleteUser';

export const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [deletePopUp, setDelete] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        className="btn"
        color="inherit"
        title="Edit Profile"
        onClick={() => {
          setOpen(true);
        }}
      >
        {<EditIcon></EditIcon>}
      </Button>
      <Dialog open={open}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit Profile, please change content of all form fields.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => {}}>
            submit
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setDelete(true);
            }}
          >
            delete user
          </Button>
        </DialogActions>
      </Dialog>
      {<ConfirmDeleteUser open={deletePopUp} cancel={setDelete} />}
    </>
  );
};
