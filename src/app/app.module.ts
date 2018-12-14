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
  MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule
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


@NgModule({
  declarations: [
    AppComponent,
    RideListComponent,
    HomeComponent,
    SignupComponent,
    AlertComponent,
    LoginComponent
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
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatGridListModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule
  ],
  providers: [RidesService, AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
