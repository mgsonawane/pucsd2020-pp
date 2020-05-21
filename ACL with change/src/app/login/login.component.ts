import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router' ;
// import { SeraclService } from "../app/seracl.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private http:HttpClient,private routers:Router) { }

  ngOnInit(): void {
  }
  public send(uname,pass,utype){
   // this.apii.login({'uname':uname,'utype':utype,'pass':pass});
   if (uname){
      if (pass){
        if (utype){
                   this.http.post('http://127.0.0.1:5000/login',{'uname':uname,'utype':utype,'pass':pass},{responseType:'text'}).subscribe((data)=>{
                     var res=JSON.parse(data);
                     if (res===1)
                         this.routers.navigate(['/home']);
                    else{
                        if (res===2)
                          this.routers.navigate(['/adhome']);
                        else
                          alert("Please Provide correct information");
                        }

                    });
                  }
        else
          alert("Please select option");
          }
      else
          alert("Please Provide password");
          }
    else
        alert("Please Provide name");
  }
 signup(){
   this.routers.navigate(['/signup']);
 }

}
