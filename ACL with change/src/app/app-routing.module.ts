import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdhomeComponent } from './adhome/adhome.component';
import { GroupComponent } from './group/group.component';
import { PermitComponent } from './permit/permit.component';
import { RmemberComponent } from './rmember/rmember.component';
const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'login' ,component:LoginComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'adhome', component:AdhomeComponent},
{ path: 'group', component:GroupComponent},
{ path: 'permit',component:PermitComponent},
{ path: 'rmember',component:RmemberComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
