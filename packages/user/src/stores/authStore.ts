import create from 'zustand';
import type { UserAuth } from '../interfaces/auth';

interface Auth {
  authorized: boolean;
  setAuthorized: () => void;
  auth: UserAuth | null;
  setAuth: (value: UserAuth) => void;
  latitude: number | null;
  longitude: number | null;
  setLatitude: (value: number) => void;
  setLongitude: (value: number) => void;
}

const useAuthStore = create<Auth>((set) => ({
  authorized: false,
  setAuthorized: () =>
    set((state) => ({
      authorized: !state.auth,
    })),
  auth: null,
  setAuth: (value: UserAuth) => set(() => ({ auth: value })),
  latitude: null,
  longitude: null,
  setLatitude: (value: number) => set(() => ({ latitude: value })),
  setLongitude: (value: number) => set(() => ({ longitude: value })),
}));

export default useAuthStore;
