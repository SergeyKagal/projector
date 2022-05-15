import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { localizationContent } from '../../../localization/types';
import { GlobalContext, Localization } from '../../../provider/provider';

export const LangToggler = () => {
  const { localization, setLocalization } = useContext(GlobalContext);

  const localHandler = () => {
    if (localization === Localization.en) {
      setLocalization(Localization.ru);
      localizationContent.setLanguage('0');
    } else {
      setLocalization(Localization.en);
      localizationContent.setLanguage('1');
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
