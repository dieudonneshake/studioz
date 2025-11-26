import { create } from 'zustand';
import { type User as FirebaseUser } from 'firebase/auth';

// This store is now a lightweight wrapper around the Firebase user state
// to provide a reactive user object across the app if needed,
// but primary auth state management is handled by the useUser hook from @/firebase.

interface AuthState {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
