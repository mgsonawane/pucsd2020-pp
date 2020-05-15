import { Component } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router' ;
// import { SeraclService } from "../app/seracl.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acl';

  constructor( private http:HttpClient,private routers:Router) { }
   public signout(){
     this.http.post("http://127.0.0.1:5000/signout",0).subscribe((data)=>{

     });
       this.routers.navigate(['/login']);
   }
}
