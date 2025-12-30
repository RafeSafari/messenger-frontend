import { create } from "zustand";
import { persist } from 'zustand/middleware';

type User = {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  status?: string;
  createdAt: number;
} | null;

type AuthState = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
