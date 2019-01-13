import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CityService} from './city.service';
import {Observable} from 'rxjs/Observable';
import {Ride} from '../_models/ride';
import {City} from '../_models/city';
import {Moment} from 'moment';
import * as moment from "moment";
import {combineLatest} from 'rxjs-compat/operator/combineLatest';


@Injectable()
export class RideService {

  private readonly url: string = `${environment.apiUrl}/ride`;

  constructor(private http: HttpClient, private cityService: CityService) {
  }


  search(from: number, to: number, date: Moment): Observable<Ride[]> {
    const url = `${this.url}/${"search"}`;
    const params = new HttpParams()
              .set("from", from.toString())
              .set("to", to.toString())
              .set("date", moment(date).format("YYYY-MM-DD"));
    return this.http.get<Ride[]>(url, { params: params });

  }

  update(ride: Ride) {
    return this.http.put<Ride>(this.url + ride.rideId, ride);
  }

  getById(id: number){
    return this.http.get<Ride>(this.url + '/' + id);
  }

  create(ride: Ride) {
    console.log(ride);
    return this.http.post(this.url+ '/add', ride);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

  getAll() {
    return this.http.get<Ride[]>(this.url + '/list');
  }

  reserve(rideId: number, userId: number) {
    let body = {
      "passengerId": userId
    };
    return this.http.post(`${this.url}/${rideId}/passenger`, body);
  }



}
