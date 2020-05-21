import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  files: []=[] ;
  folder: []=[] ;
  filee: []=[] ;
  filee1: {}={} ;
  index=0;
  selff:[]=[];
  dict: [{}]=[{}];
  permit: []=[];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/getfiles",{responseType:'text'}).subscribe((data)=>{
      this.filee1=JSON.parse(data);
      if (this.filee1['permit'])
        this.filee=this.filee1['all'];
      else
        this.filee=this.filee1['user'];
      this.permit=this.filee1['permit']
      this.selff=this.filee1['user']
      console.log(this.permit);
      //console.log(this.permit);
      var m=0;
      var n=0;
      for (let fl of this.filee){
          //console.log(fl[2]);
          if (fl[2]===1){
          this.folder[n]=fl[1];
          this.dict[n]={'id':fl[0]}
          n++;
          }
           else{
             this.files[m]=fl[1];
             m+=1;
           }

    }
    });
// console.log(this.dict);
  }
  public createe(fname,ftype){
    if (this.filee1['permit'].length>0 && this.filee1['permit'][0][1]==0){
          alert("Does not have write permission ");
          window.location.reload();
         }
     else
    {
      var m=0;
        for (let fnamee in this.filee)
        {
          if (fnamee===fname){
            alert("File Exists");
            m=1;
          }
        }
        if (m===1){
              window.location.reload();
            }
        else{
               this.http.post("http://127.0.0.1:5000/create_file",{'fname':fname,'ftype':ftype},{responseType:'text'}).subscribe((data)=>{
                  {
                    window.location.reload();
                  }

               });
             }
           }

  }
  public nxt(i){
    var idd=this.dict[i]['id']
    var m=1
            for (let vall of this.selff){
              if(idd=vall[0]){
                m=0;
              }
            }
            if (this.filee1['permit'].length>0 && this.filee1['permit'][0][1]==0){
                  m=1;
                 }
    if (m===0){
    console.log(idd);
    this.http.post("http://127.0.0.1:5000/nextfold",idd,{responseType:'text'}).subscribe((data)=>{
     //this.filee=JSON.parse(data);
     {
       window.location.reload();
     }
     });
   }
   else{
     alert("you do not have read permission")
      window.location.reload();
   }
  }
  public back(){
    this.http.get("http://127.0.0.1:5000/prevfold",{responseType:'text'}).subscribe((data)=>{
     if (JSON.parse(data) == '0'){
       alert("You are already at the homepage");
     }
     else
     {
       window.location.reload();
     }
     });
  }

}
