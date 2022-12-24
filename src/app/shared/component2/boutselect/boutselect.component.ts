import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, apiPath } from '../../../environment';

@Component({
  selector: 'app-boutselect',
  templateUrl: './boutselect.component.html',
  styleUrls: ['./boutselect.component.css'],
})
export class BoutselectComponent implements OnInit {
  @Input() apiPathInput: string;
  @Input() modelname: string;
  @Input() HaveChild: string;

  @Input() dataInit: any;
  @Input() Title: string;

  @Output() mylistchange: EventEmitter<string> = new EventEmitter();
  sData: any = [{}];
  @Input() results: any = [{ ID: '2', departmentDesc: 'CCCCCCC' }];
  myurl: string = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    //alert(environment.apiUrl);
    
    this.InitDataSelect();
    if (this.dataInit === '') {
      this.InitDataSelect();
    } else {
      this.results = this.dataInit;
    }
    //this.InitDataSelect();
  }
  /*
  ngOnChanges(changes: SimpleChanges) {
    // const veganValue = changes['dataInit'];
    // console.log('Change ', changes);
    //veganValue.isFirstChange
    // if (veganValue.firstChange === false) {
    //   this.results = veganValue.currentValue;
    //   return;
    // }
    // //alert(veganValue.currentValue);
    // console.log(veganValue.firstChange);
    //this.results = this.dataInit;
  }
*/
  async InitDataSelect() {
    let apiPathA = environment.apiUrl2 + '?modelname=' + this.modelname;

    //alert(apiPathA);
    this.myurl = apiPathA;
    
    this.myurl =  environment.apiUrl2 + '?code='+ this.modelname  ;

    await this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data9999 For Select List', data);
      //alert(data);
      this.dataInit = data;
      this.results = this.dataInit;
      //this.mylistchange.emit(this.sData);
      //this.AllRec = data.totalRec;
      // this.results = data;
    });
  }

  async setOutData(sParentID) {
    //this.results = '';
    // this.myurl =
    //   'https://lovetoshopmall.com/swagger/marlinshopWork2/' + this.apiPathInput;
    if (this.HaveChild !== 'y') {
      return;
    }
    this.myurl =
      'https://lovetoshopmall.com/swagger/marlinshopWork2/th/' +
      this.modelname +
      '/WithChild/' +
      sParentID.target.value;
    //alert(this.myurl);

    await this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data For Select List OutData', data);
      this.sData = data;
      this.mylistchange.emit(this.sData);
      //this.AllRec = data.totalRec;
      // this.results = data;
    });
  }
}

/*
How To Use 

ที่ไฟล์ Parent เรียกใช้
<app-out-select 
 [apiPathInput]="'th/department/All/1'"  
 (mylistchange)="BShowNumBerChange($event)"
></app-out-select>
// mylistchange คือ OutputEmitter ที่จะ พ่่นค่า (Inject) ออกไปให้ Parent

ที่ไฟล์ Parent สร้าง function เพื่อรับค่า จาก emit
ในที่นี้คือ 
BShowNumBerChange($event) 
// Function ที่ฝั่ง Parent
 BShowNumBerChange(e: any) {
    //alert(e);
    console.log('On App Component  99999', JSON.stringify(e));
    this.orderno = e;
  }

Case การใช้   
 1. ต้องการ Child ให้กำหนด Parameter -> modelname = ชื่อ Table
            [dataInit]="''"
            [HaveChild]="'n'"
            (mylistchange)="setChildData($event)"
     หรือ 
      <app-out-select
            [apiPathInput]="'th/department/All/1'"
            [modelname]="'department'"
            [dataInit]="''"
            [HaveChild]="'y'"
            (mylistchange)="setChildData($event)" // ไปสร้าง function setChildData ไว้ใน Parent Component
          >
      </app-out-select>       
 2. ไม่ต้องการ Child ให้กำหนด Parameter -> modelname
      <app-out-select
            [apiPathInput]="'th/category/All/1'"
            [dataInit]="dataInit"
            [modelname]="'category'"
            [HaveChild]="'n'"
          >
      </app-out-select>

*/
