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
import ConfirmPopUp from '../../ConfirmPopUp/ConfirmPopUp';
import { textContent } from '../../../localization/types';

export const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        color="inherit"
        title={textContent.editUser}
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
            cancel
          </Button>
          <Button variant="contained" onClick={() => {}}>
            submit
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setShowConfirmPopUp(true);
            }}
          >
            delete user
          </Button>
        </DialogActions>
      </Dialog>
      {
        <ConfirmPopUp
          child={<ManageAccountsIcon />}
          description="Are you sure to delete user?"
          isOpen={isShowConfirmPopUp}
          toShowPopUp={setShowConfirmPopUp}
          onConfirm={() => {
            // eslint-disable-next-line no-console
            console.log('....DELETING');
            setShowConfirmPopUp(false);
          }}
        />
      }
    </>
  );
};
