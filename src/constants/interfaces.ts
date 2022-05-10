export interface Board {
  id: string;
  title: string;
}

export interface BoardActionTypes {
  type: string;
  boardsArray: Board[];
}
