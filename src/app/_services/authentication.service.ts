import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/user/authenticate`, { email: email, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user.user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('token', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
         }

         return user;
       }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const  token = localStorage.getItem('token');
    //const id  = localStorage.getItem('currentUser').id;
    return token !== null ;
  }
}
