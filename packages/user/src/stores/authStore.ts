import create from 'zustand';
import type { UserAuth } from '../interfaces/auth';

interface Auth {
  authorized: boolean;
  setAuthorized: () => void;
  auth: UserAuth | null;
  setAuth: (value: UserAuth) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authorized: false,
  setAuthorized: () =>
    set((state) => ({
      authorized: !state.auth,
    })),
  auth: null,
  setAuth: (value: UserAuth) => set(() => ({ auth: value })),
}));

export default useAuthStore;
