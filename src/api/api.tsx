import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'http://172.105.75.240:8080/http://172.105.75.240:4000';

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = JSON.parse(localStorage.getItem('user') as string)?.token || null;

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

export const signUp = async (username: string, login: string, password: string) => {
  return await axios
    .post(`${API_URL}/signup`, {
      name: username,
      login: login,
      password: password,
    })
    .then((res) => res.data);
};

export const signIn = async (login: string, password: string) => {
  return await axios
    .post(`${API_URL}/signin`, {
      login: login,
      password: password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    });
};

export const signOut = async () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const getBoards = async () => {
  return await axios.get(`${API_URL}/boards`).then((res) => res.data);
};

export const getBoardById = async (id: string) => {
  return await axios.get(`${API_URL}/boards/${id}`).then((res) => res.data);
};

export const addBoard = async (title: string) => {
  return await axios
    .post(`${API_URL}/boards`, {
      title: title,
    })
    .then((res) => res.data);
};

export const deleteBoard = async (boardId: string) => {
  return await axios.delete(`${API_URL}/boards/${boardId}`);
};

export const addColumn = async (boardId: string, columnTitle: string, columnOrder: number) => {
  return await axios.post(`${API_URL}/boards/${boardId}/columns`, {
    title: columnTitle,
    order: columnOrder,
  });
};
