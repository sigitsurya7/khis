import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', data);
  useAuthStore.getState().setAuthData(response.data);
  document.cookie = `auth-token=${response.data.access_token}; path=/; max-age=${60 * 60 * 24}`;
  
  return response.data;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    useAuthStore.getState().clearAuthData();
    document.cookie = "auth-token=; max-age=0; path=/;";
  }
};

export const refreshToken = async () => {
  const { refreshToken } = useAuthStore.getState();
  if (!refreshToken) throw new Error('No refresh token available');
  
  const response = await api.post('/auth/refresh', {
    refresh_token: refreshToken,
  });
  
  useAuthStore.getState().setAccessToken(response.data.access_token);
  return response.data;
};