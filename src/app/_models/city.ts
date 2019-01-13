export class City {
  cityId: number;
  name: string;
  county: string;
  province: string;
  population: number;

  toString() {
    return this.name || "";
  }
}
