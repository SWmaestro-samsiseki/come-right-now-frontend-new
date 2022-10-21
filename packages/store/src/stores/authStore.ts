import create from 'zustand';

interface Auth {
  authorized: boolean;
  setAuthorized: () => void;
}

const useAuthStore = create<Auth>((set) => ({
  authorized: false,
  setAuthorized: () =>
    set(() => ({
      authorized: true,
    })),
}));

export default useAuthStore;
