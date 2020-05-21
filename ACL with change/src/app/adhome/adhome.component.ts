import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adhome',
  templateUrl: './adhome.component.html',
  styleUrls: ['./adhome.component.css']
})
export class AdhomeComponent implements OnInit {
 lst:any []=[];
 glist:any []=[];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  public myfun(){
    this.router.navigate(['/group']);
  }
 public perm(){
       this.router.navigate(['/permit']);
 }
 public chanj(){
       this.router.navigate(['/rmember']);
 }

}
