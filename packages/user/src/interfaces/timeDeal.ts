import type { StoreInfo } from './reservation';

interface TimeDealUserDTO {
  id: number;
  status: string;
  endTime: Date;
  benefit: string;
  store: StoreInfo;
}

interface CurrentTimeDealUserDTO {
  id: number;
  benefit: string;
  endTime: Date;
  storeId: string;
  businessName: string;
  storeImage: string;
  latitude: number;
  longitude: number;
  distance: number;
  participantId: number;
  status: string;
}

export type { TimeDealUserDTO, CurrentTimeDealUserDTO };
