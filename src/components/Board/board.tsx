import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteColumn, getBoardById, updateColumn } from '../../api/api';
import { IBoard, IColumn } from '../../constants/interfaces';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Header } from '../Header/Header';
import './board.scss';
import AddNewColumnForm from '../AddNewColumnForm/AddNewColumnForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import Column from '../Column/Column';
import setColumnsColor from '../SetColumnsColor/SetColumnsColor';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export const Board = () => {
  const navigate = useNavigate();

  const params = useParams<{ id: string }>().id || '';

  const [board, setBoard] = useState<IBoard | null>(null);
  const [isAddColumnFormOpen, setIsAddColumnFormOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<IColumn | null>(null);
  const [isShowConfirmPopUp, setShowConfirmPopUp] = useState(false);

  const setIsAddBoardFormOpen = () => {
    return false;
  };

  useEffect(() => {
    getBoardById(params).then((response) => {
      if (response) {
        setBoard(response);
      }
    });
  }, [params]);

  const handleDeleteColumn = async (columnToDelete: IColumn) => {
    setShowConfirmPopUp(false);

    if (board) await deleteColumn(board.id, columnToDelete.id);

    const newBoard = await getBoardById(params);
    setBoard(newBoard);
  };

  board?.columns.sort((a, b) => (a.order > b.order ? 1 : -1));
  const colors = setColumnsColor(board);

  const columns = board?.columns.map((column, index) => {
    return (
      <Column
        index={index}
        key={column.id}
        board={board}
        setBoard={setBoard}
        column={column}
        color={colors.get(column.id) || '#87A8EC'}
        setColumnToDelete={setColumnToDelete}
        setShowConfirmPopUp={setShowConfirmPopUp}
      />
    );
  });

  // async function setNewColumnOrder(board.id, column, index) {
  //   updateColumn(board.id, column, index);
  // }

  async function handleDragEnd(result: DropResult): Promise<void> {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let removed: IColumn;

    const reorder = (list: IColumn[], startIndex: number, endIndex: number): IColumn[] => {
      const result = Array.from(list);
      [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (type === 'column') {
      if (board) {
        console.log(board?.columns);
        // Сортируем старый массив в новом порядке
        const ordered: IColumn[] = reorder(board.columns, source.index, destination.index);
        console.log(ordered);

        const sendNewOrder = async () => {
          for (let i = 0; i < ordered.length; i++) {
            await updateColumn(board.id, board?.columns[i], ordered[i].title);
          }
        };

        await sendNewOrder();

        // Обновляем список колонок
        const newBoard = await getBoardById(params);
        setBoard(newBoard);
      }
    }
  }

  return (
    <>
      <Header setIsAddBoardFormOpen={setIsAddBoardFormOpen} />

      <div className="board">
        <Button
          sx={{ position: 'absolute', top: '71px', left: '10px' }}
          onClick={() => navigate(-1)}
        >
          <KeyboardBackspaceIcon sx={{ fontSize: '66px' }} />
        </Button>

        <h3>Board «{board?.title}»</h3>

        <div className="columns-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <div className="all-columns" ref={provided.innerRef} {...provided.droppableProps}>
                  {columns}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            variant="outlined"
            className="button-add-item"
            startIcon={<AddIcon />}
            onClick={() => setIsAddColumnFormOpen(true)}
          >
            ADD NEW COLUMN
          </Button>
        </div>
      </div>

      {isAddColumnFormOpen && board && (
        <AddNewColumnForm
          setIsAddColumnFormOpen={setIsAddColumnFormOpen}
          board={board}
          setBoard={setBoard}
        />
      )}

      {columnToDelete && (
        <ConfirmPopUp
          description={`Are you sure to delete column "${columnToDelete.title}"?`}
          isOpen={isShowConfirmPopUp}
          toShowPopUp={setShowConfirmPopUp}
          onConfirm={() => {
            handleDeleteColumn(columnToDelete);
          }}
        />
      )}
    </>
  );
};
