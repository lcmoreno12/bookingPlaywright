export interface HotelSearchSpec {
    location: string;
    checkin: Date;
    checkout: Date;
    adultQuantity: number;
    roomQuantity: number;
    childrenAge: string[];
  }