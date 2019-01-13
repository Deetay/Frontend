
import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '../_services';
import { Router } from '@angular/router';
import {User} from '../_models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private userData: User;
  private loggedIn: boolean;
  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private router: Router
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("currentUser"));
    this.loggedIn = this.authService.isAuthenticated();

  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(["/"]);
  }
}
