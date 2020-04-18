import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApisService {
  private srvr ="http://localhost:9090/webapi/v1/user" ;
  constructor(private http: HttpClient) { }
  
   public deldata(id){
    this.http.delete(this.srvr,id).subscribe((data) => {
     
  });
  return 1;
   }
}
