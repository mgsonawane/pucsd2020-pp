import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GettComponent } from './gett/gett.component';
import { ApisService } from './apis.service';
import {  HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';
import { PosttComponent } from './postt/postt.component';
import { PuttComponent } from './putt/putt.component';
@NgModule({
  declarations: [
    AppComponent,
    GettComponent,
    DeleteComponent,
    PosttComponent,
    PuttComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
