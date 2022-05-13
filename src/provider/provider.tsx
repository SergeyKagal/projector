import React from 'react';

export enum Localization {
  ru = 'RUS',
  en = 'ENG',
}
interface IGlobalState {
  isUserSignIn: boolean;
  setUserState: (isSignIn: boolean) => void;
  Localize: Localization;
  setLocal: (Localize: Localization) => void;
  isAddBoardFormOpen: boolean;
  setIsAddBoardFormOpen: (flag: boolean) => void;
}

export const defaultGlobalState: IGlobalState = {
  isUserSignIn: true,
  setUserState: () => {},
  Localize: Localization.en,
  setLocal: () => {},
  isAddBoardFormOpen: false,
  setIsAddBoardFormOpen: (flag: boolean) => {
    !flag;
  },
};

export const GlobalContext = React.createContext(defaultGlobalState);
