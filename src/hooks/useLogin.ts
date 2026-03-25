import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      alert('dsfds  ');
      login(email, password);
    },
  });
};
