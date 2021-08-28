export function cloneDate(date: Date): Date;

export function addDays(date: Date, days: number): Date;

export interface Flat {
  id: string,
  title: string,
  details: string,
  photos: string[],
  coordinates: number[],
  bookedDates: number[],
  totalPrice: number
}

export interface FlatRentSdkSearchSdk {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}


export class FlatRentSdk {
  get(id: number): Flat;
  search(parameters: FlatRentSdkSearchSdk): Promise<Flat[]>;
  book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<number>;
}