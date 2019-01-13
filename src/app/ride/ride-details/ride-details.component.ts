import { Component, OnInit } from '@angular/core';
import {User} from '../../_models';
import {RideService} from '../../_services/ride.service';
import {Ride} from '../../_models/ride';
import {UserService} from '../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {

  photo;

  rideDetails: Ride = new Ride();
  private ownerId: number;
  userData: User;

  private rideId: number;

  isDataReady: boolean = false;
  currentUserId: number;
  isOwner: boolean = false;

  constructor(
    private rideService: RideService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe(res => {
      this.rideId = res.rideId;
    });
  }

  ngOnInit() {
    this.rideService.getById(this.rideId).subscribe(
      ride => {
        this.rideDetails = ride;
        this.userService.getById(this.rideDetails.ownerId).subscribe(
          data => {
            this.userData = data;
            this.currentUserId = JSON.parse(localStorage.getItem('currentUser'));
            this.isOwner = (this.userData.userId == this.currentUserId);
            this.isDataReady = true;
          });
      }
    );

  }
  canReserve() {
    return this.rideDetails.numberOfSeats - this.rideDetails.bookedSeats > 0
      && (!isNullOrUndefined(this.rideDetails.passengers) && !this.rideDetails.passengers.includes(this.currentUserId));
  }

  reserve() {
    this.rideService.reserve(this.rideDetails.rideId, this.userData.userId).subscribe(
      () => {
        console.log("success!");
      },
      error => {
        console.log(error);
      }
    )
  }
  goToUserPage() {
    this.router.navigate(['user/' + this.userData.userId]);
  }

}
