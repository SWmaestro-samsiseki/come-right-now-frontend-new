import create from 'zustand';
import type { ReservationDTO } from '../interfaces/reservation';

interface StandStore {
  standList: ReservationDTO[];
  initStandList: (value: ReservationDTO[]) => void;
  addStand: (value: ReservationDTO) => void;
  removeStand: (value: ReservationDTO) => void;
  reservationList: ReservationDTO[];
  addReservation: (value: ReservationDTO) => void;
  removeReservation: (value: ReservationDTO | number) => void;
  updateReservation: (id: number, time: Date) => void;
}

const useReservationStore = create<StandStore>((set) => ({
  standList: [],
  initStandList: (value: ReservationDTO[]) => set(() => ({ standList: value })),
  addStand: (value: ReservationDTO) => set((state) => ({ standList: [...state.standList, value] })),
  removeStand: (value: ReservationDTO) =>
    set((state) => ({ standList: [...state.standList.filter((ele) => ele !== value)] })),
  reservationList: [],
  addReservation: (value: ReservationDTO) =>
    set((state) => ({ reservationList: [...state.reservationList, value] })),
  removeReservation: (value: ReservationDTO | number) => {
    if (typeof value === 'number')
      set((state) => ({
        reservationList: [...state.reservationList.filter((ele) => ele.id !== value)],
      }));
    else {
      set((state) => ({
        reservationList: [...state.reservationList.filter((ele) => ele !== value)],
      }));
    }
  },
  updateReservation: (id: number, time: Date) =>
    set((state) => ({
      reservationList: [
        ...state.reservationList.map((ele) => {
          if (ele.id === id) {
            return {
              id: ele.id,
              numberOfPeople: ele.numberOfPeople,
              departureTime: ele.departureTime,
              estimatedTime: time,
              createdAt: ele.createdAt,
              reservationStatus: ele.reservationStatus,
              user: ele.user,
              store: ele.store,
            };
          } else return ele;
        }),
      ],
    })),
}));

export default useReservationStore;
