export interface IBoard {
  id: string;
  title: string;
}

export interface BoardActionTypes {
  type: string;
  boardsArray: IBoard[];
}
