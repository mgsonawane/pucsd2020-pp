import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettComponent } from './gett/gett.component';
import { DeleteComponent } from './delete/delete.component' ;
import { PosttComponent } from './postt/postt.component';
import { PuttComponent} from './putt/putt.component' ;
const routes: Routes = [
  { path : 'gett', component : GettComponent },
  { path : 'delete' ,component : DeleteComponent},
  { path : 'postt' ,component : PosttComponent},
  { path : 'putt' ,component : PuttComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
