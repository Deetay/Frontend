import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatGridListModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatAutocompleteModule,
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS, MatChipsModule, MatTooltipModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { RideListComponent } from './ride-list/ride-list.component';
import {AppRoutingModule} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RidesService} from './rides.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { NavbarComponent } from './navbar/navbar.component';
import { CitySearchComponent } from './city-search/city-search.component';
import {CityService} from './_services/city.service';
import {RideService} from './_services/ride.service';
import { AddRideComponent } from './ride/add-ride/add-ride.component';
import { RideComponent } from './ride/ride.component';
import localePl from '@angular/common/locales/pl';
import {registerLocaleData} from '@angular/common';
import { RideDetailsComponent } from './ride/ride-details/ride-details.component';
import { RateComponent } from './rate/rate.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './profile/info/info.component';
import { RidesComponent } from './profile/rides/rides.component';
import { EditComponent } from './profile/edit/edit.component';
import {RatingHelper} from './_helpers/ratinghelper';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return date.toDateString();
    }
  }
}
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    RideListComponent,
    HomeComponent,
    SignupComponent,
    AlertComponent,
    LoginComponent,
    NavbarComponent,
    CitySearchComponent,
    AddRideComponent,
    RideComponent,
    RideDetailsComponent,
    RateComponent,
    ProfileComponent,
    InfoComponent,
    RidesComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatGridListModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatDialogModule,
    MatAutocompleteModule, MatChipsModule, MatTooltipModule
  ],
  providers: [RidesService, AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    CityService, RideService, RatingHelper,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}],
  entryComponents: [RateComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }


