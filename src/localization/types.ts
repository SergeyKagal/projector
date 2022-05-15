import LocalizedStrings from 'react-localization';
import { en } from './en';
import { ru } from './ru';

const localizationContentOptions = { 1: { ...ru }, 0: { ...en } };

export const localizationContent = new LocalizedStrings({ ...localizationContentOptions });
