import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gett',
  templateUrl: './gett.component.html',
  styleUrls: ['./gett.component.css']
})   
export class GettComponent implements OnInit {
 lstt : {} ;
  constructor(private service:ApisService,private http:HttpClient) { }

  ngOnInit(): void {
    var id=2;
    this.http.get("http://localhost:9090/webapi/v1/user").subscribe((data) => {
      this.lstt=(data) ;
      this.lstt=this.lstt['data'];
       console.log(this.lstt);
      //  for (var val of this.lstt) {
      //    console.log(val['id']);
      //  }
  });

    // this.lstt=this.service.getdataa ;
    // console.log(this.lstt);
  }

}
