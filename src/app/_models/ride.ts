import { Place } from "./place";
import { User } from "./user";

export class Ride {
  rideId: number;
  ownerId: number;
  description: string;
  from: Place = new Place();
  to: Place = new Place();
  numberOfSeats: number;
  bookedSeats: number;
  price: number;
  date: any;
  passengers: number[];

}
