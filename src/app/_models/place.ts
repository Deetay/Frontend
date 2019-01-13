import { City } from "./city";

export class Place {
  localizationId: number;
  city: City = new City();
  placeInfo: string;

}
