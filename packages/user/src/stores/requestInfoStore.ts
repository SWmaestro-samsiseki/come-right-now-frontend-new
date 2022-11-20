import create from 'zustand';
import type { Category } from '../interfaces/common';

interface RequestInfo {
  selectedCategories: Category[];
  people: number;
  time: number;
  addCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  plusPeople: () => void;
  minusPeople: () => void;
  plusTime: () => void;
  minusTime: () => void;
  initPT: () => void;
}

const useRequestInfoStore = create<RequestInfo>((set) => ({
  selectedCategories: [],
  people: 1,
  time: 0,
  addCategory: (category: Category) =>
    set((state) => ({ selectedCategories: [...state.selectedCategories, category] })),
  removeCategory: (category: Category) =>
    set((state) => ({
      selectedCategories: [...state.selectedCategories.filter((ele) => ele !== category)],
    })),
  plusPeople: () =>
    set((state) => ({ people: state.people < 30 ? state.people + 1 : state.people })),
  minusPeople: () =>
    set((state) => ({ people: state.people > 1 ? state.people - 1 : state.people })),
  plusTime: () => set((state) => ({ time: state.time < 30 ? state.time + 5 : state.time })),
  minusTime: () => set((state) => ({ time: state.time > 0 ? state.time - 5 : state.time })),
  initPT: () => set(() => ({ selectedCategories: [], people: 1, time: 0 })),
}));

export default useRequestInfoStore;
