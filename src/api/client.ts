import axios from 'axios';
import { ENV } from '../config/env';
import { attachInterceptors } from './interceptors';

console.log('🚀 ~ ENV.BASE_URL:', ENV.BASE_URL);
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachInterceptors(apiClient);

export default apiClient;
