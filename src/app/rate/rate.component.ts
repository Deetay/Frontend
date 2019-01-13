import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../_services';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  rate: number;

  photo;



  constructor(private dialogRef: MatDialogRef<RateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

  }


  sendUserRate() {
    this.userService.rateUser(this.data.userData.userId, this.rate).subscribe(
    )
  }

  rateUser(rate: number) {
    this.rate = rate;
    console.log("current rate is: " + rate);
  }

}
