/* eslint-disable no-debugger */
import axios from 'axios';
import { User, Role } from '../models/types';

const API_URL = import.meta.env.VITE_API_TEST_URL;
const userEndpoint = 'User';
const roleEndpoint = 'Role';

// Fetch users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/${userEndpoint}`);
  debugger;
  return response.data;
};

// Fetch roles
export const fetchRoles = async (): Promise<Role[]> => {
  const response = await axios.get(`${API_URL}/${roleEndpoint}`);
  debugger;
  return response.data;
};

// Create user
export const createUser = async (formData: User): Promise<User> => {
  const response = await axios.post(`${API_URL}/${userEndpoint}`, formData);
  return response.data;
};

// Update user
export const updateUser = async (id: number, formData: User): Promise<User> => {
  const response = await axios.put(`${API_URL}/${userEndpoint}/${id}`, formData);
  return response.data;
};

// Delete user
export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/${userEndpoint}/${id}`);
};
