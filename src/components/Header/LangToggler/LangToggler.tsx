import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { localizationContent } from '../../../localization/types';
import { GlobalContext, Localization } from '../../../provider/provider';

export const LangToggler = (props: { isDesktopMode: boolean }) => {
  const { localization, setLocalization } = useContext(GlobalContext);

  const localHandler = () => {
    if (localization === Localization.en) {
      setLocalization(Localization.ru);
      localizationContent.setLanguage('en');
    } else {
      setLocalization(Localization.en);
      localizationContent.setLanguage('ru');
    }
  };
  return (
    <>
      <Button color="inherit" onClick={localHandler} fullWidth={!props.isDesktopMode}>
        {localization}
      </Button>
    </>
  );
};
