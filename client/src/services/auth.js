import api, { mockApi } from './api';

const login = async (email, password) => {
  // Use mock API for testing
  const response = await mockApi.post('/mock-auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const register = async (userData) => {
  // Use mock API for testing
  const response = await mockApi.post('/mock-auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
