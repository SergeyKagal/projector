import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const CreateNewBoard = (props: { setIsAddBoardFormOpen: (flag: boolean) => void }) => {
  return (
    <Button
      color="inherit"
      onClick={() => {
        props.setIsAddBoardFormOpen(true);
      }}
    >
      <AddIcon />
      Add new board
    </Button>
  );
};
