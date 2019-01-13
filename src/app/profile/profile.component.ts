import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, UserService} from '../_services';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userModel: User = new User();
  editForm: boolean = false;
  editOrCancel = "Edytuj";

  userId: number = this.authService.getCurrentUserId();

  @ViewChild('form') form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    //this.userService.getById(this.userId)
    //  .subscribe(user => {this.userModel = user; console.log(this.userModel)} );
    // this.form.form.disable();
    console.log(this.router.url);

  }

  enableForm() {
    this.editForm = !this.editForm;
    this.editOrCancel = this.editForm ? "Edytuj" : "Anuluj";

  }

  onSubmit() {
    this.userService.update(this.userModel, this.userId).subscribe(
      () => {

      },
      error => {
        console.log(error);
      }
    );
  }


}
