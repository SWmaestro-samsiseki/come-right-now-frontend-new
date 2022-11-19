import create from 'zustand';
import type { TimeDealUserDTO, CurrentTimeDealDTO } from '../interfaces/timeDeal';

interface TimeDealStore {
  timeDealList: TimeDealUserDTO[];
  initTimeDeal: (value: TimeDealUserDTO[]) => void;
  removeTimeDeal: (value: TimeDealUserDTO) => void;
  currentTimeDealList: CurrentTimeDealDTO[];
  initCurrentTimeDeal: (value: CurrentTimeDealDTO[]) => void;
  removeCurrentTimeDeal: (value: CurrentTimeDealDTO) => void;
}

const useTimeDealStore = create<TimeDealStore>((set) => ({
  timeDealList: [],
  initTimeDeal: (value: TimeDealUserDTO[]) => set(() => ({ timeDealList: value })),
  removeTimeDeal: (value: TimeDealUserDTO) =>
    set((state) => ({
      timeDealList: [...state.timeDealList.filter((ele) => ele.id !== value.id)],
    })),
  currentTimeDealList: [],
  initCurrentTimeDeal: (value: CurrentTimeDealDTO[]) => set(() => ({ currentTimeDealList: value })),
  removeCurrentTimeDeal: (value: CurrentTimeDealDTO) =>
    set((state) => ({
      currentTimeDealList: [...state.currentTimeDealList.filter((ele) => ele.id !== value.id)],
    })),
  setCheckInTimeDeal: (value: CurrentTimeDealDTO) =>
    set((state) => ({
      currentTimeDealList: [
        ...state.currentTimeDealList.map((ele) => {
          if (ele.id !== value.id) {
            return ele;
          } else {
            const newItem = ele;
            newItem.status = 'ARRIVED';
            return ele;
          }
        }),
      ],
    })),
}));

export default useTimeDealStore;
