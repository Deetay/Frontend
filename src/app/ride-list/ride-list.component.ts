
import {Component, Input, OnInit} from '@angular/core';
import {RidesService} from '../rides.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {

  @Input() rides: any = [];


  constructor() { }

  ngOnInit() { }


}
