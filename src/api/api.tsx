import axios, { AxiosRequestConfig } from 'axios';
import { IColumn, ITask } from '../constants/interfaces';
import { createBrowserHistory } from 'history';
import { PATH } from '../constants/paths';

const API_URL = 'https://afternoon-hamlet-46054.herokuapp.com';

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = JSON.parse(localStorage.getItem('user') as string)?.token || null;

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === 401) {
      localStorage.removeItem('user');
      localStorage.setItem('AUTHORIZATION_ERROR', error.response.data.statusCode);
      const history = createBrowserHistory();
      history.push(PATH.AUTHORIZATION_ERROR);
      location.reload();
    }
    return Promise.reject(error);
  }
);

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
        if (localStorage.getItem('AUTHORIZATION_ERROR')) {
          localStorage.removeItem('AUTHORIZATION_ERROR');
        }
      }
      return res.data;
    });
};

export const signOut = () => {
  localStorage.removeItem('user');
};

export const getUserData = async (id: string) => {
  return await axios.get(`${API_URL}/users/${id}`).then((res) => {
    return res.data;
  });
};

export const editProfile = async (
  username: string,
  login: string,
  password: string,
  id: string
) => {
  return await axios
    .put(`${API_URL}/users/${id}`, {
      name: username,
      login: login,
      password: password,
    })
    .then((res) => res.data);
};

export const deleteUser = async (id: string) => {
  return await axios.delete(`${API_URL}/users/${id}`).then((res) => res.data);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`).then((res) => res.data);
};

export const getBoards = async () => {
  return await axios.get(`${API_URL}/boards`).then((res) => res.data);
};

export const getBoardById = async (id: string) => {
  return await axios.get(`${API_URL}/boards/${id}`).then((res) => res.data);
};

export const addBoard = async (title: string, description: string) => {
  return await axios
    .post(`${API_URL}/boards`, {
      title: title,
      description: description,
    })
    .then((res) => res.data);
};

export const deleteBoard = async (boardId: string) => {
  return await axios.delete(`${API_URL}/boards/${boardId}`);
};

export const addColumn = async (boardId: string, columnTitle: string) => {
  return await axios.post(`${API_URL}/boards/${boardId}/columns`, {
    title: columnTitle,
  });
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  return await axios.delete(`${API_URL}/boards/${boardId}/columns/${columnId}`);
};

export const updateColumn = async (boardId: string, column: IColumn, newOrder?: number) => {
  return await axios.put(`${API_URL}/boards/${boardId}/columns/${column.id}`, {
    title: column.title,
    order: newOrder || column.order,
  });
};

export const getTasks = async (boardId: string, columnId: string) => {
  return await axios
    .get(`${API_URL}/boards/${boardId}/columns/${columnId}/tasks`)
    .then((res) => res.data);
};

export const getTaskById = async (boardId: string, columnId: string, taskId: string) => {
  return await axios
    .get(`${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
    .then((res) => res.data);
};

export const addTask = async (boardId: string, columnId: string, task: ITask) => {
  return await axios
    .post(`${API_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
      title: task.title,
      description: task.description,
      userId: task.userId,
    })
    .then((res) => res.data);
};

export const deleteTask = async (task: ITask) => {
  return await axios.delete(
    `${API_URL}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}`
  );
};

export const updateTask = async (task: ITask) => {
  return await axios
    .put(`${API_URL}/boards/${task.boardId}/columns/${task.columnId}/tasks/${task.id}`, {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId: task.boardId,
      columnId: task.columnId,
    })
    .then((res) => res.data);
};
