export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}
export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns: IColumn[];
}

export interface ITask {
  id?: string;
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  // boardId: string;
  // columnId: string;
}

export interface BoardActionTypes {
  type: string;
  boardsArray: IBoard[];
}
