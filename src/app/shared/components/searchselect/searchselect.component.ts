import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-searchselect',
  templateUrl: './searchselect.component.html',
  styleUrls: ['./searchselect.component.css'],
})

/*
@Input Model 
  apiPath : string ,
  apiPathChild : string ,
  apiPathChildren : string ,
*/
export class SearchselectComponent implements OnInit {
  @ViewChild('myNameElem') myNameElem: ElementRef;
  @Input() apiPath: string;
  @Input() dataInit: any;

  @Output() myListChange: EventEmitter<string> = new EventEmitter();
  outPutMessage: any = {};
  //

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   }),
  //   responseType: 'text' as 'json',
  // };

  baseUrl: string = '';
  results: any = '';
  results2: any = '';
  results3: any = '';
  myurl: string = '';
  tableAPI: string = 'Department';
  pageno = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.baseUrl = environment.apiHost + this.apiPath;
    this.results = this.dataInit;
    this.fetchData2();
  }

  //th/department/All/1
  fetchData2() {
    this.results = '';
    this.myurl =
      'https://lovetoshopmall.com/swagger/marlinshopWork2' + this.apiPath;
    console.log('aa', this.myurl);
    this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data For Select List', data);
      //this.AllRec = data.totalRec;
      this.results = data;
    });
  }

  fetchDat3(id: string) {
    this.results2 = '';
    let apiPath2 = '/th/department/WithChild/' + id;
    this.myurl =
      'https://lovetoshopmall.com/swagger/marlinshopWork2' + apiPath2;

    this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data For Child Select List', data);
      //this.AllRec = data.totalRec;
      //this.dataInit = data;
      this.results2 = data;
      // this.myListChange.emit(data);
    });
  }

  fetchDat4(id: string) {
    this.results3 = '';
    let apiPath2 = '/th/category/WithChild/' + id;
    this.myurl =
      'https://lovetoshopmall.com/swagger/marlinshopWork2' + apiPath2;

    this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data For Child Select List', data);
      //this.AllRec = data.totalRec;
      //this.dataInit = data;
      this.results3 = data;
      // this.myListChange.emit(data);
    });
  }

  onChange999(e: any) {
    console.clear();
    let id = e.target.value;
    this.fetchDat3(id);
  }

  onChange9999(e: any) {
    console.clear();
    let id = e.target.value;

    this.fetchDat4(id);
  }
}
