import axios, { AxiosResponse } from 'axios';
import User from '../types/user';
import UserCreate from '../types/user-create';
import UserUpdate from '../types/user-update';

const VITE_API_URL = 'http://localhost:3000/api';

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const fetchUsers = async (page: number = 1, limit: number = 10, query: string = ''): Promise<User[]> => {
  const response: AxiosResponse<PaginatedResponse<User>> = await axios.get(`${VITE_API_URL}/users`, {
    params: { page, limit, query }
  });
  return response.data.data; // Retorna apenas o array de usuários
};

export const getUser = async (id: number): Promise<User> => {
  const response: AxiosResponse<User> = await axios.get(`${VITE_API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (userData: UserCreate): Promise<User> => {
  const response: AxiosResponse<User> = await axios.post(`${VITE_API_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (user: User): Promise<UserUpdate> => {
  const response: AxiosResponse<UserUpdate> = await axios.patch(`${VITE_API_URL}/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${VITE_API_URL}/users/${id}`);
};

// Mantemos o objeto api para compatibilidade, caso seja necessário
const api = {
  getUsers: fetchUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

export default api;