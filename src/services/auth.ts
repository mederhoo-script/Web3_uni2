import { apiRequest } from './api';
import type { LoginForm, RegisterForm, User } from '../types/index';

export const authService = {
  // Register new user
  register: async (data: RegisterForm): Promise<{ user: User; token: string }> => {
    const response = await apiRequest.post<{ user: User; token: string }>('/auth/register', data);
    return response.data.data!;
  },

  // Login user
  login: async (data: LoginForm): Promise<{ user: User; token: string }> => {
    const response = await apiRequest.post<{ user: User; token: string }>('/auth/login', data);
    return response.data.data!;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await apiRequest.post<{ token: string }>('/auth/refresh', { refreshToken });
    return response.data.data!;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiRequest.post('/auth/logout');
  },

  // Request password reset
  forgotPassword: async (email: string): Promise<void> => {
    await apiRequest.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiRequest.post('/auth/reset-password', { token, password });
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiRequest.get<{ user: User }>('/users/profile');
    return response.data.data!.user;
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiRequest.put<{ user: User }>('/users/profile', data);
    return response.data.data!.user;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiRequest.post('/users/change-password', {
      currentPassword,
      newPassword,
    });
  },
};