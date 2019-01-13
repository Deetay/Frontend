import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards';
import {AddRideComponent} from './ride/add-ride/add-ride.component';
import {RideComponent} from './ride/ride.component';
import {RideDetailsComponent} from './ride/ride-details/ride-details.component';
import {ProfileComponent} from './profile/profile.component';
import {InfoComponent} from './profile/info/info.component';
import {EditComponent} from './profile/edit/edit.component';
import {RidesComponent} from './profile/rides/rides.component';

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'addride', component: AddRideComponent, canActivate: [AuthGuard] },
  { path: 'ridelist', component: RideComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'user/:id', component: InfoComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile/info', component: InfoComponent },
  { path: 'profile/edit', component: EditComponent },
  { path: 'profile/rides', component: RidesComponent },
  { path: 'ride/:rideId', component: RideDetailsComponent },
  { path: '**', redirectTo: '' }

];

/**
 * Module responsible for routing across the app
 */

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
