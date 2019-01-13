import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, UserService} from '../../_services';
import {DomSanitizer} from '@angular/platform-browser';
import {RatingHelper} from '../../_helpers/ratinghelper';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  sanitizedPhoto;

  user: User = new User();

  userId: number;

  isDataReady: boolean = false;

  isHimself: boolean;

  userAge: number;


  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router, private userService: UserService,
              private sanitizer: DomSanitizer, private ratingHelper: RatingHelper, private authService: AuthenticationService) {
    this.route.params.subscribe(
      param => this.userId = param.id,
      error => this.router.navigate['home']
    );
    this.userService.getById(this.userId).subscribe(user => {
      if (user != null) {
        this.user = user;
        this.user.userId = this.userId;
        this.isHimself = (authService.getCurrentUserId() == this.userId);
        this.userAge = this.calculateAge();
        // this.userService.getPhoto(this.userId)
        //   .subscribe(photo => {
        //     let urlCreator = window.URL;
        //     this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
        //   })
        this.isDataReady = true;
      }
      else {
        this.router.navigate['home'];
      }
    });
  }

  openRateWindow() {
    this.ratingHelper.open(this.sanitizedPhoto, this.user);
  }

  calculateAge() {
    let newDate = new Date(this.user.birthDate);
    let timeDiff = new Date().valueOf() - newDate.valueOf();
    return Math.floor((timeDiff / (1000 * 3600  * 24)) / 365);
  }

}
