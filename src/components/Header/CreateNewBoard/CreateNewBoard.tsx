import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { localizationContent } from '../../../localization/types';
import { useContext } from 'react';
import { GlobalContext } from '../../../provider/provider';

export const CreateNewBoard = () => {
  const { setIsCreateNewBoardOpen } = useContext(GlobalContext);

  return (
    <Button
      color="inherit"
      onClick={() => {
        setIsCreateNewBoardOpen(true);
      }}
    >
      <AddIcon />
      {localizationContent.addBoard}
    </Button>
  );
};
