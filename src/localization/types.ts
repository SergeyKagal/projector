import { LocalizedStringsMethods } from 'react-localization';
import en from './en.json';
import ru from './ru.json';

export const textContentOptions = { 1: { ...ru }, 0: { ...en } };

export interface ILocal extends LocalizedStringsMethods {
  about: string;
}
