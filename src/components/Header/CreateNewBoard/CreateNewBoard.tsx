import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import { GlobalContext } from '../../../provider/provider';

export const CreateNewBoard = () => {
  const { setIsAddBoardFormOpen } = useContext(GlobalContext);

  return (
    <Button
      color="inherit"
      onClick={() => {
        setIsAddBoardFormOpen(true);
      }}
    >
      <AddIcon />
      Add new board
    </Button>
  );
};
