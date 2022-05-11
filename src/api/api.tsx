import axios from 'axios';
import { resolve } from './resolve.js';

const API_URL = 'https://cors-anywhere.herokuapp.com/172.105.75.240:4000';

export async function signUp(username: string, login: string, password: string) {
  return await resolve(
    axios
      .post(`${API_URL}/signup`, {
        name: username,
        login: login,
        password: password,
      })
      .then((res) => res.data)
  );
}

export async function signIn(login: string, password: string) {
  return await resolve(
    axios
      .post(`${API_URL}/signin`, {
        login: login,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
      })
  );
}

export async function signOut() {
  localStorage.removeItem('user');
}

export async function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
}

export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) user = JSON.parse(userStr);
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}

export const getBoards = async (token: string) => {
  return await axios
    .get(`${API_URL}/boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};
