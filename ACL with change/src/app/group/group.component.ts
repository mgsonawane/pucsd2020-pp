import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  lst:any []=[];
  glist:any []=[];
  glist1: {} = {};
constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
      this.http.get("http://127.0.0.1:5000/getusers",{responseType:'text'}).subscribe((data)=>{
        this.lst=JSON.parse(data);
      });
}
public addd(i){
  this.glist.push(this.lst[i][0]);
  console.log(this.glist);
}
public sub(name,val1){
  if (this.glist.length>1){
          if (name){
            if(val1){
              var m=0;
          for (var i = 0; i < this.glist.length; i++){
              for (var j = i+1  ; j < this.glist.length; j++)
              {
                if (this.glist[i]===this.glist[j])
                  m=1;
              }
            }
            if (m==1){
                  alert("Add one user once only")
                  window.location.reload();
                }
            else{
                          this.glist1['users']=this.glist;
                          this.glist1['name']=name;
                                  if (val1==='1'){
                                    this.glist1['read']=1;
                                    this.glist1['write']=0;
                                  this.glist1['execute']=0;  }
                                  else{
                                    if (val1==='2'){
                                      this.glist1['read']=0;
                                      this.glist1['write']=1;
                                    this.glist1['execute']=0;  }
                                    else{
                                      if (val1==='12'){
                                          this.glist1['read']=1;
                                          this.glist1['write']=1;
                                        this.glist1['execute']=0; }
                                      else{
                                        if (val1==='3'){
                                            this.glist1['read']=0;
                                            this.glist1['write']=0;
                                          this.glist1['execute']=1; }
                                      else{
                                          this.glist1['read']=1;
                                          this.glist1['write']=1;
                                          this.glist1['execute']=1;}  }  } }  }
                      this.http.post("http://127.0.0.1:5000/createGroup",this.glist1,{responseType:'text'}).subscribe((data)=>{
                          if (JSON.parse(data)===2)
                              alert("Group name alredy exist");
                          else
                            this.router.navigate(['/adhome']);
                        });  }
          else
            alert ("select permission");}
        else
          alert ("Enter name of group");}
          else
            alert ("Group has atleat two members!!!!!!!!!!!");}
public back(){
  this.router.navigate(['/adhome']);
}
public refresh(){
  window.location.reload();
}
}
