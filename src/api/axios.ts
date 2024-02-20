import axios from 'axios';
import { SERVER_URL } from '../config';

export const axiosInstance = axios.create({ baseURL: SERVER_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
