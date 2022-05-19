import React, { Dispatch, SetStateAction } from 'react';
import jwtDecode from 'jwt-decode';
import { IBoard } from '../constants/interfaces';

export const getUserInformation = (): IUser => {
  const token = JSON.parse(localStorage.getItem('user') as string)?.token;

  if (token) {
    try {
      const decoded = jwtDecode<IUser>(token);
      const user = { ...decoded, isUserSignIn: true };

      return user;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return { isUserSignIn: false };
};

export enum Localization {
  ru = 'РУС',
  en = 'ENG',
}

export interface IUser {
  userId?: string;
  login?: string;
  isUserSignIn?: boolean;
}

interface IGlobalState {
  userState: IUser;
  localization: Localization;
  isCreateNewBoardOpen: boolean;
  setUserState: (user: IUser) => void;
  setLocalization: (Localize: Localization) => void;
  setIsCreateNewBoardOpen: Dispatch<SetStateAction<boolean>>;
  boardsArray: IBoard[];
  setBoardsArray: (boards: IBoard[]) => void;
  stickyHeader: boolean;
  setStickyHeader: (isStickyHeader: boolean) => void;
}

export const defaultGlobalState: IGlobalState = {
  userState: getUserInformation(),
  localization: Localization.en,
  isCreateNewBoardOpen: false,
  setUserState: () => {},
  setLocalization: () => {},
  setIsCreateNewBoardOpen: () => {},
  boardsArray: [],
  setBoardsArray: () => {},
  stickyHeader: false,
  setStickyHeader: () => {},
};

export const GlobalContext = React.createContext(defaultGlobalState);
