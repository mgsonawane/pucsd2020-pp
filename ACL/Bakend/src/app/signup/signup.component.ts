import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private routers:Router ,private http:HttpClient) { }

  ngOnInit(): void {
  }
  public send(uname,pass1,pass2,utype){
    if (uname){
       if (utype){
         if (pass1 || pass2){
           if(pass1===pass2){
                    this.http.post('http://127.0.0.1:5000/signup',{'uname':uname,'utype':utype,'pass':pass2},{responseType:'text'}).subscribe((data)=>{
                      var res=JSON.parse(data);
                      if (res===1)
                          this.routers.navigate(['/login']);
                     else
                         alert("Please Provide correct information");

                     });
                   }
                   else
                    alert("Password does not match!!");
                   }
         else
            alert("Please Provide password");
           }
       else
            alert("Please select option");
           }
     else
         alert("Please Provide name");
  }
}
