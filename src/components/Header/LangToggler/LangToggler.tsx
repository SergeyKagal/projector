import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalContext, Localization } from '../../../provider/provider';

export const LangToggler = () => {
  const { localization, setLocalization, textContent } = useContext(GlobalContext);
  const localHandler = () => {
    if (localization === Localization.en) {
      setLocalization(Localization.ru);
      textContent.setLanguage('0');
    } else {
      setLocalization(Localization.en);
      textContent.setLanguage('1');
    }
  };
  return (
    <>
      <Button color="inherit" onClick={localHandler}>
        {localization}
      </Button>
    </>
  );
};
