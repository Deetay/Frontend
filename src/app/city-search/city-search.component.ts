import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {CityService} from '../_services/city.service';
import {City} from '../_models/city';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  private cities: City[] ;

  @Input()
  placeholder: string ;



  selectedId: number;
  selectedCity: string;
  filteredCities: string[];
  autoCities: City[];
  private searchTerms = new Subject<string>();

  constructor(private cityService: CityService) { }

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

  this.cityService.getCities().subscribe(cities => {
    this.cities = cities;
  })
  }
}
