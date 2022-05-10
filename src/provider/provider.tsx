import React from 'react';
import { Board } from '../constants/interfaces';

interface IGlobalState {
  isUserSignIn: boolean;
  setUserState: (isSignIn: boolean) => void;
  boardsArray: Board[];
  setBoardsArray: (boards: Board[]) => void;
}

export const defaultGlobalState: IGlobalState = {
  isUserSignIn: true,
  setUserState: () => {},
  boardsArray: [],
  setBoardsArray: () => {},
};

export const GlobalContext = React.createContext(defaultGlobalState);
