import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-postt',
  templateUrl: './postt.component.html',
  styleUrls: ['./postt.component.css']
})
export class PosttComponent implements OnInit {
  listt :{}={} ;
  constructor(private http:HttpClient) { }
  ssendd(fname,lname,email,cont_num,pass1,pass2){
    if (pass1==pass2 && pass2.length > 7 ){
      if(!fname){
        alert("Enter first name");
      }
      else{
        if (!lname)
          alert("Enter last name");
        else{
          if(!cont_num || cont_num.length != 10 )
            alert ("enter correct contact");
          else{
            this.listt['first_name']=fname;
            this.listt['last_name']=lname;
            this.listt['email']=email;
            this.listt['password']=pass1;
            this.listt['contact_number']=cont_num;
            console.log(this.listt);

          }
        }
      }
      
      // send data to bakend
      // this.http.post("http://localhost:9090/webapi/v1/user",this.listt).subscribe((data) => {
     
      // },(error)=>console.log(error) );
    }
    else 
      alert ("wrong password");
  }
  ngOnInit(): void {
  }

}
