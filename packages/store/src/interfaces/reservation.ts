import type { UserAuth } from './auth';

interface StoreInfo {
  id: string;
  businessName: string;
  storeType: string;
  address: string;
  latitude: number;
  longitude: number;
  storePhone: string;
  introduce: string;
  storeImage: string | null;
  mainMenu1: string | null;
  mainMenu2: string | null;
  mainMenu3: string | null;
  menuImage: string | null;
  starRate: number;
  todayOpenAt: Date;
  todayCloseAt: Date;
  businessHours: {
    id: number;
    businessDay: string;
    openAt: Date;
    closeAt: Date;
  }[];
}

interface ReservationDTO {
  id: number;
  numberOfPeople: number;
  departureTime: Date;
  estimatedTime: Date;
  createdAt: Date;
  reservationStatus: string;
  user: UserAuth;
  store: StoreInfo;
}

export type { ReservationDTO };
