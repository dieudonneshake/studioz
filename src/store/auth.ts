
import { create } from 'zustand';
import { User } from '@/lib/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import { users as initialUsers } from '@/lib/data';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  // User list is now managed by the data layer, but we keep mutation logic here.
  // In a real app, these would be API calls that revalidate data.
  updateUserStatus: (userId: string, status: 'approved' | 'pending' | 'rejected') => void;
  removeUser: (userId: string) => void;
}

// In-memory manipulation for demonstration. In a real app, this would be an API call.
const updateUser = (userId: string, status: 'approved' | 'pending' | 'rejected') => {
    const userIndex = initialUsers.findIndex(u => u.id === userId);
    if(userIndex !== -1) {
        initialUsers[userIndex].status = status;
    }
};

const deleteUser = (userId: string) => {
    const userIndex = initialUsers.findIndex(u => u.id === userId);
    if(userIndex !== -1) {
        initialUsers.splice(userIndex, 1);
    }
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      updateUserStatus: (userId, status) => {
        updateUser(userId, status);
        // We don't need to update state here as components will re-fetch/re-render.
        // For client-side updates, you might force a re-render or use a different pattern.
      },
      removeUser: (userId: string) => {
        deleteUser(userId);
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      // Only persist auth state, not the full user list
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    }
  )
);
