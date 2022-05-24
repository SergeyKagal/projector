const getColor = (columnId: number): string => {
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

  return columnId === 7 ? colors[0] : colors[columnId + 1];
};

export default getColor;
