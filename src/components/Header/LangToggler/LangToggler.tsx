import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalContext, Localization } from '../../../provider/provider';

export const LangToggler = () => {
  const { localization, setLocalization } = useContext(GlobalContext);
  const localHandler = () => {
    localization === Localization.en
      ? setLocalization(Localization.ru)
      : setLocalization(Localization.en);
  };
  return (
    <>
      <Button color="inherit" onClick={localHandler}>
        {localization}
      </Button>
    </>
  );
};
