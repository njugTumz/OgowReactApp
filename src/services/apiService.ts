/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_TEST_URL;

export const login = async (email: string, password: string): Promise<string> => {
  try {
    debugger;
    const response = await axios.post(`${API_URL}/User/Login`, {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data.token;
    } else {
      throw new Error('Login failed');
    }
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
