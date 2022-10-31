interface MiniTimeDealDTO {
  benefit: string;
  endTime: Date;
  id: number;
  status: string;
}

interface MiniUserDTO {
  birthDate: string;
  creditRate: number;
  id: string;
  name: string;
  phone: string;
}

interface TimeDealStoreDTO {
  id: number;
  status: string;
  endTime: Date;
  benefit: string;
  participants?: { id: number; status: string; user: MiniUserDTO }[];
}

interface CheckInUserDTO {
  id: number;
  status: string;
  timeDeal: MiniTimeDealDTO;
  user: MiniUserDTO;
}

export type { MiniUserDTO, TimeDealStoreDTO, CheckInUserDTO };
