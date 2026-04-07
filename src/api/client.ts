import axios from 'axios';
import { ENV } from '../config/env';
import { attachInterceptors } from './interceptors';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachInterceptors(apiClient);

export default apiClient;
