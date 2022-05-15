import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import {en} from './en';
import {ru} from './ru';

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
export const textContent= new LocalizedStrings({ ...textContentOptions })