export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface BoardActionTypes {
  type: string;
  boardsArray: IBoard[];
}
