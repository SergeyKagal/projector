import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IColumn } from '../../constants/interfaces';
import './Column.scss';

interface IColumnProps {
  column: IColumn;
  setColumnToDelete: (column: IColumn) => void;
  setShowConfirmPopUp: (flag: boolean) => void;
}

const Column = (props: IColumnProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, column: IColumn) => {
    event.stopPropagation();
    props.setColumnToDelete(column);
    props.setShowConfirmPopUp(true);
  };

  return (
    <Container className="column">
      <div className="column__title">
        {props.column.title}
        <Button
          sx={{ p: '0px', minWidth: '' }}
          onClick={(event) => handleClick(event, props.column)}
        >
          {<DeleteIcon />}
        </Button>
      </div>
      <Button variant="text" className="button-add-item" startIcon={<AddIcon />}>
        ADD TASK
      </Button>
    </Container>
  );
};

export default Column;
