import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards';

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'addroute', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
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
