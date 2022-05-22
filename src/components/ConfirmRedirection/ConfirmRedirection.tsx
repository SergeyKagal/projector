import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { localizationContent } from '../../localization/types';

interface IConfirm {
  isOpen: boolean;
  toShowPopUp: (isShow: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  child?: JSX.Element;
  description: string;
}

const ConfirmRedirection = (props: IConfirm) => {
  return (
    <>
      <Dialog open={props.isOpen}>
        <DialogTitle color="secondary">{localizationContent.redirectionPopup.title}</DialogTitle>
        <DialogContent>
          {props.child}
          <DialogContentText>{props.description}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={props.onCancel}>
            {localizationContent.buttons.cancel}
          </Button>
          <Button color="secondary" variant="contained" onClick={props.onConfirm}>
            {localizationContent.buttons.redirect}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmRedirection;
