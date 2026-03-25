import apiClient from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { LoginResponse } from '../api/types';

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(ENDPOINTS.LOGIN, {
    email,
    password,
  });

  return response.data;
};
