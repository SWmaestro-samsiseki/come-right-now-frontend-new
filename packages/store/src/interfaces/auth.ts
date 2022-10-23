interface LoginOutputDTO {
  isSuccess: boolean;
  message: string;
  accessToken: string;
  userType: string;
}
interface UserAuth {
  id: string;
  email: string;
  name: string;
  phone: string;
  bitrh: string;
  creditRate: number;
}
interface StoreAuth {
  id: string;
  masterName: string;
  storeName: string;
  businessName: string;
  storeType: string;
  address: string;
  latitude: number;
  longitude: number;
  storePhone: string;
  masterPhone: string;
  introduce: string;
  storeImage: string | null;
  businessNumber: string;
  mainMenu1: string | null;
  mainMenu2: string | null;
  mainMenu3: string | null;
  menuImage: string | null;
  starRate: number;
  businessHours: {
    id: number;
    businessDay: string;
    openAt: string;
    closeAt: string;
  }[];
  account: {
    email: string;
  };
}

export type { LoginOutputDTO, UserAuth, StoreAuth };
