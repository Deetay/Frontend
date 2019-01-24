import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models';
import {Router} from '@angular/router';
import {AuthenticationService, UserService} from '../../_services';
import * as moment from 'moment';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  photo;

  userModel: User = new User();
  //userUpdate: User = new User();

  today: Date = new Date();

  passConfirm: string;
  optionalInfo: any = {};

  userId: number =this.authService.getCurrentUserId();

  constructor(private userService: UserService, private router: Router,private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(user => {
      if (user) {
        this.userModel = user;
        console.log(user);
        // this.userService.getPhoto(this.userId)
        //   .subscribe(photo => {
        //     let urlCreator = window.URL;
        //     this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
        //   })
      }
      else
        this.router.navigate[''];
    });

  }
  buildDepartureTimeString(date: moment.Moment): string {
    return `${moment(date).format("YYYY-MM-DD")}`;
  }

  updateUser() {
    console.log(this.userModel);
    this.userModel.birthDate = this.buildDepartureTimeString(this.userModel.birthDate)
    this.userModel.email="";
    console.log(this.userModel)
    this.userService.update(this.userModel, this.userId).subscribe(
      response => {
        console.log(response);
        console.log("success");
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.photo = event.target.result;
      };
    }
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      //  let urlCreator = window.URL;
      this.photo = fileBrowser.files[0];
      formData.append("file", fileBrowser.files[0]);
      this.userService.upload(formData, this.userId).subscribe(res => {
      });
    }
  }
}
