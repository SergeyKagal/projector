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
}

export const defaultGlobalState: IGlobalState = {
  isUserSignIn: true,
  setUserState: () => {},
  Localize: Localization.en,
  setLocal: () => {},
};

export const GlobalContext = React.createContext(defaultGlobalState);
