import { IBoard } from '../constants/interfaces';

const getColumnsColor = (board: IBoard | null): Map<string, string> => {
  const colorMap = new Map();

  const colors = [
    '#6a93e8',
    '#ffa000',
    '#ff5fa2',
    '#673ab7',
    '#28ceaa',
    '#a86b04',
    'rgb(74, 102, 162)',
    '#f5a5c6',
  ];

  let id = 0;

  if (board) {
    board.columns.map((column) => {
      colorMap.set(column.id, colors[id]);
      id = id === 7 ? 0 : id + 1;
    });
  }

  return colorMap;
};

export default getColumnsColor;
