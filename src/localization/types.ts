import LocalizedStrings from 'react-localization';
import { en } from './en';
import { ru } from './ru';

const localizationContentOptions = { ru: { ...ru }, en: { ...en } };

export const localizationContent = new LocalizedStrings({ ...localizationContentOptions });
