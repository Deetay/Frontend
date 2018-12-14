import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from './_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  private loggedIn: boolean;
  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private router: Router
  ) { }

  ngOnInit() {
    this.loggedIn = this.authService.isAuthenticated();

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
