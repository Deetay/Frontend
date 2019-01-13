import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services';
import {CityService} from '../_services/city.service';
import {Router} from '@angular/router';
import {RideService} from '../_services/ride.service';
import {Ride} from '../_models/ride';
import * as moment from "moment";
import {City} from '../_models/city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly fromPlaceholder = "Miasto wyjazdu";
  readonly toPlaceholder = "Miasto przyjazdu";

  today = new Date();
  date = new FormControl(moment(), [Validators.required]);
  loggedIn: boolean = this.authService.isAuthenticated();

  showList = false;
  showSpinner = false;
  foundNothing = false;
  foundRides: Ride[];

  constructor(
    private authService: AuthenticationService,
    private cityService: CityService,
    private rideService: RideService,
    private router: Router) { }


  onEnter() {
    let button: HTMLElement = document.getElementsByClassName("btn-search")[0] as HTMLElement
    button.click();
  }

  search(fromCity: City, toCity: City) {
    this.showSpinner = true;
    this.foundRides = null;
    this.foundNothing = false;
    this.rideService
      .search(fromCity.cityId, toCity.cityId, this.date.value)
      .subscribe(rides => {
        if (rides.length === 0) {

            this.finishWithNoResults();

            return;
        } else {
          console.log(rides);
          this.foundRides = rides;
          //this.redirectToResults(rides);
          this.showList = true;
        }
      }, _ => {
        this.showSpinner = false;
      })
  }


  finishWithNoResults() {
    this.foundNothing = true;
    this.showSpinner = false;
  }

  back(){
    this.foundNothing = false;
    this.showList = false;
  }

  ngOnInit() {
    this.authService.loggedInStatus.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

}
