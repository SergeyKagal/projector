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
import { localizationContent } from '../../../localization/types';

export const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        color="inherit"
        title={localizationContent.editUser}
        onClick={() => {
          setOpen(true);
        }}
      >
        {<ManageAccountsIcon></ManageAccountsIcon>}
      </Button>
      <Dialog open={open}>
        <DialogTitle>{localizationContent.editProfilePopup.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ManageAccountsIcon fontSize="large" />
            {localizationContent.editProfilePopup.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {localizationContent.buttons.cancel}
          </Button>
          <Button variant="contained" onClick={() => {}}>
            {localizationContent.buttons.submit}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setShowConfirmPopUp(true);
            }}
          >
            {localizationContent.buttons.deleteUser}
          </Button>
        </DialogActions>
      </Dialog>
      {
        <ConfirmPopUp
          child={<ManageAccountsIcon />}
          description={localizationContent.deletePopup.description}
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
