import {Injectable} from '@angular/core';
import {environment as env, environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {City} from '../_models/city';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CityService {

  private cities: City[] = [];
  private readonly url: string = `${environment.apiUrl}/city/list`;

  constructor(private http: HttpClient) {
  }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.url)

  }

  //
  // searchCity(cityName: string): Observable<City | null> {
  //   this.getCities().subscribe(City => this.cities=);
  //   return this.searchCities(cityName, 1)
  //     .mergeMap(cities => {
  //       return (cities[0] || null);
  //     })
  //
  // }
}

