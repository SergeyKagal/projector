import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GlobalContext } from '../../../provider/provider';
import { useContext } from 'react';

export const CreateNewBoard = (props: { setIsAddBoardFormOpen: (flag: boolean) => void }) => {
  const { textContent } = useContext(GlobalContext);
  return (
    <Button
      color="inherit"
      onClick={() => {
        props.setIsAddBoardFormOpen(true);
      }}
    >
      <AddIcon />
      {textContent.addBoard}
    </Button>
  );
};
