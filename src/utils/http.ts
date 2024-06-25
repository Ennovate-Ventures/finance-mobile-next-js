// utils/http.ts
import axios, { AxiosRequestConfig, Method } from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Bearer token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Combined utility function
export const httpRequest = async (
  method: Method,
  url: string,
  data?: any,
  params?: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
      ...config,
    });
    return response.data;
  } catch (error) {
    handleHttpError(error);
  }
};

// Error handling function
const handleHttpError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected error:', error);
  }
  throw error;
};
