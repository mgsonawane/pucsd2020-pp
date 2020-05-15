import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adhome',
  templateUrl: './adhome.component.html',
  styleUrls: ['./adhome.component.css']
})
export class AdhomeComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  myfun(){
    this.http.get("http://127.0.0.1:5000/getusers",{responseType:'text'}).subscribe((data)=>{
      console.log(JSON.parse(data));
    });
  }
}
