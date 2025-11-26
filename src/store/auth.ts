
import { create } from 'zustand';
import { User } from '@/lib/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import { users as initialUsers } from '@/lib/data';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// NOTE: This file is now deprecated in favor of Firebase Auth.
// It is kept for reference but its functions are no longer used
// for login, logout, or user state management.
// The new user state comes from the `useUser()` hook in `@/firebase`.

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
