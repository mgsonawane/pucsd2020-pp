import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
  import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeraclService {
  public login(id){
    console.log(id);
    // HttpClient.post('http://127.0.0.1:5000/login',id,{responseType:'text'}).subscribe((data)=>{
    //  });

  }
}
