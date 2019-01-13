import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, UserService} from '../../_services';
import {RideService} from '../../_services/ride.service';
import {Ride} from '../../_models/ride';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  userId: number = parseInt(localStorage.getItem("id"));
  rides: Ride[] = [];

  hasRides: boolean = true;

  constructor(
    private routeService: RideService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    let id = this.authService.getCurrentUserId();
    this.userService.getUserRides(id).subscribe(
      data => {
        this.rides = data;
        if(this.rides.length===0){
          console.log(this.rides);
          this.hasRides=false;
        }
      }
    );

  }


}
