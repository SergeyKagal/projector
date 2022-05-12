import { Button } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ConfirmDelete from '../../ConfirmDelete/ConfirmDelete';

export const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [isShowDeleteConfirm, showDeleteConfirm] = useState(false);

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
        {<ManageAccountsIcon></ManageAccountsIcon>}
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
              showDeleteConfirm(true);
            }}
          >
            delete user
          </Button>
        </DialogActions>
      </Dialog>
      {<ConfirmDelete isOpen={isShowDeleteConfirm} closeConfirmModal={showDeleteConfirm} />}
    </>
  );
};