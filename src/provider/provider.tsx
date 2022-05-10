import React from 'react';

interface IGlobalState {
  isUserSignIn: boolean;
  setUserState: (isSignIn: boolean) => void;
}

export const defaultGlobalState: IGlobalState = {
  isUserSignIn: true,
  setUserState: () => {},
};

export const GlobalContext = React.createContext(defaultGlobalState);
