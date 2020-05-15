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
  index=0;
  dict: [{}]=[{}];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/getfiles",{responseType:'text'}).subscribe((data)=>{
      this.filee=JSON.parse(data);
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
       this.http.post("http://127.0.0.1:5000/create_file",{'fname':fname,'ftype':ftype},{responseType:'text'}).subscribe((data)=>{
        if (JSON.parse(data)=='exist'){
         alert ("File already exist");
       }
        else{
            window.location.reload();
          }

       });
  }
  public nxt(i){
    var idd=this.dict[i]['id']
    //console.log(idd);
    this.http.post("http://127.0.0.1:5000/nextfold",idd,{responseType:'text'}).subscribe((data)=>{
     //this.filee=JSON.parse(data);
     {
       window.location.reload();
     }
     });

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
