import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RidesService {

  constructor(private http: HttpClient) { }

  getCar(Id: number) :Observable<any>{
   return   this.http.get("http://localhost:8080/car/all")
  }


}
