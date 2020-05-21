import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rmember',
  templateUrl: './rmember.component.html',
  styleUrls: ['./rmember.component.css']
})
export class RmemberComponent implements OnInit {
  lst: []=[];
  lst1: []=[];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/getgroup",{responseType:'text'}).subscribe((data)=>{
      this.lst=JSON.parse(data);
    });
  }
  public back(){
    this.router.navigate(['/adhome']);
  }
  public send(val1){
    this.http.post("http://127.0.0.1:5000/getmembers",val1,{responseType:'text'}).subscribe((data)=>{
      this.lst1=JSON.parse(data);
      console.log(this.lst1);
    });
  }
  public send2(val1){
    // this.http.post("http://127.0.0.1:5000/getmembers",val1,{responseType:'text'}).subscribe((data)=>{
    //   this.lst1=JSON.parse(data);
    //   console.log(this.lst1);
    // });
  }
}
