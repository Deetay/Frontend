import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import {Ride} from '../_models/ride';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/all`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/` + id);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/signup`, user);
  }


  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/` + id);
  }

  update(user: User, userId: number) {
    console.log(JSON.stringify(user))
    return this.http.put<User>(`${environment.apiUrl}/user/edit/` + userId, user);
  }

  rateUser(userId: number, rate: number) {
    return this.http.put(`${environment.apiUrl}/user/rate/${userId}?rate=${rate}`, {});
  }

  getUserRides(id: number) {
    console.log(id);
    return this.http.get<Ride[]>(`${environment.apiUrl}/rides/user/` + id);
  }

  getPhoto(id: number): Observable<any> {

    return this.http.get(`${environment.apiUrl}/user/photo/${id}`, { responseType: "blob", observe: "response" })
      .pipe(
        map(res => res.status === 204 ? null : res.body),
        tap(data => {
          if (data) {
            console.log(data);
          }
        })
      )
  }
  upload(formData: FormData, id: number) {
    return this.http.post(`${environment.apiUrl}/user/addphoto/` + id, formData);
  }

}
