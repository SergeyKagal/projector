import { useParams } from 'react-router-dom';
import { getBoardById } from '../../api/api';

export const Board = () => {
  const params = useParams<{ id: string }>().id || '';

  const showBoard = async () => {
    await getBoardById(params);
  };
  showBoard();

  return <h3>Board {params}</h3>;
};
