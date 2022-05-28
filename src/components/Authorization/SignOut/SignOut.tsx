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
import { signOut } from '../../../api/api';
import { getUserInformation, GlobalContext } from '../../../provider/provider';
import { localizationContent } from '../../../localization/types';
import { PATH } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';

const SignOut = (props: { isDesktopMode: boolean }) => {
  const { setUserState } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        color="inherit"
        title={localizationContent.signOut}
        onClick={() => {
          setIsModalOpen(true);
        }}
        sx={{ gap: '10px' }}
        fullWidth={!props.isDesktopMode}
      >
        {<LogoutIcon />}
        {!props.isDesktopMode && localizationContent.signOut}
      </Button>
      <Dialog open={isModalOpen}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {localizationContent.signOutPopup.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{localizationContent.signOutPopup.description}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleClose}>
            {localizationContent.buttons.cancel}
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              handleClose();
              signOut();
              setUserState(getUserInformation());
              navigate(PATH.BASE_URL);
            }}
          >
            {localizationContent.buttons.signOut}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOut;
