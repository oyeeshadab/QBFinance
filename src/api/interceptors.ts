import { AxiosInstance } from 'axios';
import { getToken } from '../utils/tokenStorage';

export const attachInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async config => {
      //   const token = await getToken();
      //   console.log('🚀 ~ attachInterceptors ~ token:', token);

      //   if (token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      //   }

      return config;
    },
    error => Promise.reject(error),
  );

  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        // refresh token logic here
      }

      return Promise.reject(error);
    },
  );
};
