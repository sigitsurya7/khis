import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role_id: number;
  status: number;
  uid: string;
  username: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuthData: (data: {
    access_token: string;
    refresh_token: string;
    user: User;
  }) => void;
  clearAuthData: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setAuthData: (data) =>
        set({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          user: data.user,
          isAuthenticated: true,
        }),
      clearAuthData: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'auth-storage',
    }
  )
);