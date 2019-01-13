import {Component, Input, OnInit} from '@angular/core';
import {User} from '../_models';
import {Ride} from '../_models/ride';
import {AuthenticationService, UserService} from '../_services';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {RideService} from '../_services/ride.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  sanitizedPhoto;

  @Input()
  rideData: Ride = new Ride();

  userData: User;
  userId: number; //for convenience
  currentUser: number;

  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer, private routeService: RideService, private authService: AuthenticationService) {
    this.currentUser = +this.authService.getCurrentUserId();
  }

  ngOnInit() {
    if (this.rideData.ownerId) {
      this.userId = this.rideData.ownerId;
      this.userService.getById(this.userId).subscribe(
        data => {
          this.userData = data;
          //this.getPhoto();
        });
    }
    else {
     // this.router.navigate(['']);
    }
  }

  redirectToRouteDetails() {
    this.router.navigate(["/ride/" + this.rideData.rideId]);
  }

  goToUserPage() {
    this.router.navigate(['user/' + this.userId]);
  }

  // getPhoto() {
  //   this.userService.getPhoto(this.userId)
  //     .subscribe(photo => {
  //       let urlCreator = window.URL;
  //       this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
  //     })
  // }

  reserve() {
    this.routeService.reserve(this.rideData.rideId, this.currentUser).subscribe(
      () => {
        this.redirectToRouteDetails();
      },
      error => {
        console.log(error);
      }
    )
  }

  canReserve() {
    return this.rideData.numberOfSeats - this.rideData.bookedSeats > 0
      && (!isNullOrUndefined(this.rideData.passengers) && !this.rideData.passengers.includes(this.currentUser));
  }
}

