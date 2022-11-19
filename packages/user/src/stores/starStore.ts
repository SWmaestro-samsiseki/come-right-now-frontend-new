import create from 'zustand';

interface Star {
  starList: [];
}

const useStarStore = create<Star>(() => ({
  starList: [],
}));

export default useStarStore;
