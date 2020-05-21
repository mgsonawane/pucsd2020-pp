import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Router, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AdhomeComponent } from './adhome/adhome.component';
import { GroupComponent } from './group/group.component';
import { PermitComponent } from './permit/permit.component';
import { RmemberComponent } from './rmember/rmember.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AdhomeComponent,
    GroupComponent,
    PermitComponent,
    RmemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
