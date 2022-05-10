import { Board, BoardActionTypes } from '../constants/interfaces';

export function boardReducer(state: Board[], action: BoardActionTypes) {
  switch (action.type) {
    case 'SET_BOARD_ARRAY':
      return [...action.boardsArray];

    default:
      return state;
  }
}
