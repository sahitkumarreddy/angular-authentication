import { SpecialEventsComponent } from './special-events/special-events.component';
import { RegularEventsComponent } from './regular-events/regular-events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/regularevents',
    pathMatch: 'full'
  },
  {
    path: 'regularevents',
    component: RegularEventsComponent
  },
  {
    path: 'specialevents',
    component: SpecialEventsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
