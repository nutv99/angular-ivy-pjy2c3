import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
  selector: '[appCallAPI]'
})
export class CallAPIDirective {

  @Input() apiPath99: string = '';
  @Output() appHttpOut: EventEmitter<any> = new EventEmitter();
  myurl = 'th/category/All/1';
  apiPathInput = 'th/category/All/1';
  results: any = {};

  constructor(private http: HttpClient) {}
  @HostListener('input', ['$event']) LoadDataFromBackEnd(event: any) {
    this.myurl =
      'https://lovetoshopmall.com/swagger/marlinshopWork2/' + this.apiPath99;

    this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data For Directive', data);

      // this.results = data;
      this.appHttpOut.emit(data);
    });
  }

}