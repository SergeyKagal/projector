import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalContext, Localization } from '../../../provider/provider';

export const LangToggler = () => {
  const { Localize, setLocal } = useContext(GlobalContext);
  const localHandler = () => {
    Localize === Localization.en ? setLocal(Localization.ru) : setLocal(Localization.en);
  };
  return (
    <>
      <Button className="btn" color="inherit" onClick={localHandler}>
        {Localize}
      </Button>
    </>
  );
};
