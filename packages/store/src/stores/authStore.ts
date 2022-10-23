import create from 'zustand';
import type { StoreAuth } from '../interfaces/auth';

interface Auth {
  authorized: boolean;
  setAuthorized: () => void;
  auth: StoreAuth | null;
  setAuth: (value: StoreAuth) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authorized: false,
  setAuthorized: () =>
    set(() => ({
      authorized: true,
    })),
  auth: null,
  setAuth: (value: StoreAuth) => set(() => ({ auth: value })),
}));

export default useAuthStore;
