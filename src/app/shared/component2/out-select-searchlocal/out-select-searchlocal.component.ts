import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  Renderer2,
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, apiPath } from '../../../environment';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-out-select-searchlocal',
  templateUrl: './out-select-searchlocal.component.html',
  styleUrls: ['./out-select-searchlocal.component.css'],
})
export class OutSelectSearchlocalComponent implements OnInit {
  @Input() apiPathInput: string;
  @Input() modelname: string;
  @Input() HaveChild: string;

  @Input() dataInit: any;
  @Input() dataDefault: any;
  @Input() Title: string;

  @Output() mylistchange: EventEmitter<string> = new EventEmitter();
  sData: any = [{}];
  @Input() results: any = [{ ID: '2', departmentDesc: 'CCCCCCC' }];

  faEditIcon = faEdit;
  showList: boolean = false;
  addListMode: boolean = true;
  id: number = -99;
  svarname = 'var_' + Math.ceil(Math.random() * 10000).toString();
  // svarname = svarname.toString();

  heroesA = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
    { id: 5, name: 'BatGirl' },
    { id: 3, name: 'Robin' },
    { id: 4, name: 'Flash' },
  ];

  myData: string = '';
  txtSearch: string = '';
  myurl: string = '';
  showDelete: boolean = false;
  showWarning: boolean = false;
  txtDefault: string;

  heroesB = this.heroesA;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    //alert(this.svarname);
    if (this.dataInit === '') {
      this.InitDataSelect();
    } else {
      this.results = this.dataInit;
    }

    this.InitDataSelect();
  }

  ngOnChanges() {
    // alert('Change-'+ this.dataDefault) ;
    this.setToList2(this.dataDefault);
  }

  async InitDataSelect() {
    // this.modelname = 'category';
    let apiPathA = environment.apiUrl + 'th/' + this.modelname + '/All/1';
    // alert(environment.apiUrl);
    //alert(apiPathA);
    this.myurl = apiPathA;
    this.myurl = environment.apiUrl2 + 'jsonselect/?code=' + this.modelname;
    // this.myurl =
    //   'https://lovetoshopmall.com/swagger/marlinshopWork2/th/department/All/1';

    await this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      //console.table('Data9999 For Select List', data);
      //alert(data);
      this.dataInit = data.DataResult;
      this.results = this.dataInit;
      this.heroesA = this.dataInit;

      this.heroesB = data.DataResult;

      console.log('Data Init', this.dataInit);
      //dataDefault
      for (let i = 0; i <= this.dataInit.length - 1; i++) {
        //console.log('222 Data Init-'+i, this.dataInit[i][0], ' VS ' , this.dataDefault) ;
        if (parseInt(this.dataInit[i][0]) === parseInt(this.dataDefault)) {
          this.txtDefault = this.dataInit[i][1];
          console.log('Found', this.dataInit[i][1]);
          this.txtDefault = this.dataInit[i][1];
          alert(this.txtDefault);
        }
      }
      this.showDelete = false;

      //this.mylistchange.emit(this.sData);
      //this.AllRec = data.totalRec;
      // this.results = data;
    });
  }

  FilterHeroes(e: any) {
    console.log(e.target.value);

    //this.showList = true;
    let st = e.target.value;
    //this.heroesB = this.heroesB.filter(this.isBigEnough(e.target.value))
    this.heroesB = this.heroesA.filter((entry) => entry[1].includes(st));

    if (e.target.value === '') {
      console.log(this.showDelete);
      this.showDelete = false;
      this.showWarning = true;
    } else {
      this.showDelete = true;
      this.showWarning = false;
    }
    console.log('After Blank--', this.showDelete);
  }

  hideList() {
    this.showList = false;
  }
  ToogleList() {
    this.showList = !this.showList;
  }

  setshowList() {
    this.showList = true;
  }

  setToList2(e: any) {
    for (let i = 0; i <= this.dataInit.length - 1; i++) {
      //console.log('222 Data Init-'+i, this.dataInit[i][0], ' VS ' , this.dataDefault) ;
      if (parseInt(this.dataInit[i][0]) === parseInt(this.dataDefault)) {
        this.txtDefault = this.dataInit[i][1];
        console.log('Found', this.dataInit[i][1]);
        this.txtDefault = this.dataInit[i][1];
        alert(this.txtDefault);
      }
    }
  }
  setToList(e: any) {
    //console.log(this.heroesA.length, ' vs ', this.heroesB.length);

    if (this.heroesA.length != this.heroesB.length) {
      this.myData = this.heroesB[e][1].trim();
      this.id = this.heroesB[e][0];
    } else {
      this.myData = this.heroesA[e][1].trim();
      this.id = this.heroesB[e][0];
    }

    let id2 = this.id.toString();

    this.mylistchange.emit(id2);

    if (this.myData === '') {
      this.showDelete = false;
      this.showWarning = true;
    } else {
      this.showDelete = true;
      this.showWarning = false;
    }
    //this.showDelete = false;
    this.hideList();
  }

  ClearValue() {
    this.myData = '';
    this.heroesB = this.dataInit;
    this.showList = false;
    this.showDelete = false;
    this.showWarning = true;
    var element = this.renderer.selectRootElement(this.svarname);
    element.value = '';
    element.focus();
  }
}
