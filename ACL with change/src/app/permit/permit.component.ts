import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {
  lst:any []=[];
  glist:any []=[];
  glist1: {} = {};
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/getgroup",{responseType:'text'}).subscribe((data)=>{
      this.lst=JSON.parse(data);
    });
    }
    public sub(val1,val2){
      console.log(val2);
      if (val1 && val2){
                if (val2==='1'){
                    this.glist1['read']='1';
                    this.glist1['write']='0';
                    this.glist1['execute']='0';  }
                else{
                  if (val2==='2'){
                    this.glist1['read']='0';
                    this.glist1['write']='1';
                  this.glist1['execute']='0';  }
                  else{
                    if (val2==='12'){
                        this.glist1['read']='1';
                        this.glist1['write']='1';
                      this.glist1['execute']='0'; }
                    else{
                      if (val2==='3'){
                          this.glist1['read']='0';
                          this.glist1['write']='0';
                        this.glist1['execute']='1'; }
                    else{
                        this.glist1['read']='1';
                        this.glist1['write']='1';
                        this.glist1['execute']='1';}  }  } }
                    this.glist1['gid']=val1
    this.http.post("http://127.0.0.1:5000/changepermission",this.glist1,{responseType:'text'}).subscribe((data)=>{
            alert("permission Changed");
            this.router.navigate(['/adhome']);
      });
    }
        else
          alert ("select group and permission");
      }
    public back(){
    this.router.navigate(['/adhome']);
    }
    public refresh(){
    window.location.reload();
    }
    }
