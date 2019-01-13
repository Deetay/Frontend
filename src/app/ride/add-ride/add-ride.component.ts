import { Component, OnInit } from '@angular/core';
import {Ride} from '../../_models/ride';
import {Router} from '@angular/router';
import {RideService} from '../../_services/ride.service';
import {CityService} from '../../_services/city.service';
import {AuthenticationService} from '../../_services';
import {City} from '../../_models/city';
import * as moment from 'moment';
import {Place} from '../../_models/place';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {



  today = new Date();
  private cities: City[] ;
  private autoCities: City[] ;
  timeModel: any = {};

  rideModel: Ride = new Ride();
  showSpinner = false;

  constructor(private router: Router,
              private rideService: RideService,
              private authService: AuthenticationService,
              private cityService: CityService) {
  }

  onSubmit() {
    this.rideModel.date = this.buildDepartureTimeString(this.rideModel.date, this.timeModel.from)

    let fromCity: City;
    let toCity: City;


    this.rideModel.bookedSeats = 0;
    this.showSpinner = true;
    const id: number = this.authService.getCurrentUserId();
    this.rideModel.ownerId = id;

    this.rideService.create(this.rideModel).subscribe(
      () => {
        this.router.navigate(['/profile/routes']);
      },
      error => {
        console.log(error);
        this.showSpinner = false;
        this.router.navigate(['/home']);
      }
    )
  }


  buildDepartureTimeString(date: moment.Moment, time: string): string {
    return `${moment(date).format("YYYY-MM-DD")}T${time}`;
  }

  capitalize(s)
  {
    if(s.length>0) {
      return s[0].toUpperCase() + s.slice(1).toLowerCase();
    }
  }

  search(term: string): void {
    //this.filteredCities=this.cities.map(k=>k.name).filter(k => k.startsWith(term)).slice(0, 3);
    term = this.capitalize(term)
    this.autoCities=this.cities.filter(c=>c.name.startsWith(term)).slice(0, 3);
  }

  displayFn(city: City) {
    if(city == null) {
      return
    }
    return city.name;
  }

  ngOnInit() {
    const id: number = this.authService.getCurrentUserId();
    console.log(id);
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    })
  }
}

