import { IBoard } from '../../constants/interfaces';

const setColumnsColor = (board: IBoard | null): Map<string, string> => {
  const colorMap = new Map();

  const colors = [
    '#6a93e8',
    '#ffa000',
    '#ff5fa2',
    '#28ceaa',
    '#673ab7',
    'rgb(74, 102, 162)',
    '#a86b04',
    '#f5a5c6',
  ];

  if (board) {
    board.columns.map((column, index) => {
      colorMap.set(column.id, colors[index]);
    });
  }
  return colorMap;
};

export default setColumnsColor;
