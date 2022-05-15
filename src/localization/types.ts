import { LocalizedStringsMethods } from 'react-localization';
import en from './en.json';
import ru from './ru.json';

export const textContentOptions = { 1: { ...ru }, 0: { ...en } };

export interface ILocal extends LocalizedStringsMethods {
  about: string;
  team: string;
  toMain: string;
  signup: string;
  signin: string;
  names: string[];
  jobs: string[];
  gitHubLink: string;
  addBoard: string;
  editUser: string;
  signOut: string;
  boardList: string;
}
