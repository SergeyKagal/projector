export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}
export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
  description: string;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface INewTask {
  title: string;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface BoardActionTypes {
  type: string;
  boardsArray: IBoard[];
}
