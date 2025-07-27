import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('auth_token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('auth_token');
  }
};

// Initialize token from localStorage
const storedToken = localStorage.getItem('auth_token');
if (storedToken) {
  setAuthToken(storedToken);
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      setAuthToken(null);
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden - show error message
      console.error('Access denied:', error.response.data?.error?.message);
    } else if (error.response?.status >= 500) {
      // Server error - show generic error
      console.error('Server error:', error.response.data?.error?.message);
    }

    return Promise.reject(error);
  }
);

// Generic API helpers
export const apiRequest = {
  get: <T = any>(url: string, params?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.get(url, { params }),
    
  post: <T = any>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.post(url, data),
    
  put: <T = any>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.put(url, data),
    
  delete: <T = any>(url: string): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.delete(url),
    
  patch: <T = any>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.patch(url, data),
};

// File upload helper
export const uploadFile = async (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<AxiosResponse<ApiResponse>> => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
};

export default api;