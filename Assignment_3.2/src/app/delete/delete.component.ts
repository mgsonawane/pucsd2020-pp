import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisService } from "../apis.service";
import { from } from 'rxjs';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  constructor(private apii: ApisService,private http:HttpClient) { }

  subb(aa){
    this.apii.deldata(aa);
  }
  ngOnInit(): void {
  }
  
}
