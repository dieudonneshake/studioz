import { create } from 'zustand';
import { User } from '@/lib/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import { users as initialUsers } from '@/lib/data';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  login: (user: User) => void;
  logout: () => void;
  updateUserStatus: (userId: string, status: 'approved' | 'pending' | 'rejected') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      users: initialUsers, // Initialize with mock data
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      updateUserStatus: (userId, status) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, status } : user
        )
      })),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
