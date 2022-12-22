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
import { environment } from '../../../environment';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-outselectv2',
  templateUrl: './outselectv2.component.html',
  styleUrls: ['./outselectv2.component.css'],
})
export class Outselectv2Component implements OnInit {
  @Input() apiPathInput: string;
  @Input() ModelName: string;
  @Input() HaveChild: string;

  @Input() dataInit: any;
  @Input() Title: string;

  @Output() myListChange: EventEmitter<string> = new EventEmitter();
  sData: any = [{}];
  @Input() results: any = [{ ID: '2', departmentDesc: 'CCCCCCC' }];

  faEditIcon = faEdit;
  showList: boolean = false;
  addListMode: boolean = true;
  id: number = -99;
  heroesA = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
    { id: 5, name: 'BatGirl' },
    { id: 3, name: 'Robin' },
    { id: 4, name: 'Flash' },
  ];
  myData: string = '';
  myurl: string = '';
  showDelete: boolean = false;
  showWarning: boolean = false;

  heroesB = this.heroesA;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.dataInit === '') {
      this.InitDataSelect();
    } else {
      this.results = this.dataInit;
    }

    this.InitDataSelect();
  }

  async InitDataSelect() {
    // this.ModelName = 'category';
    let apiPathA = 'th/' + this.ModelName + '/All/1';

    //alert(apiPathA);
    this.myurl =
      'https://lovetoshopmall.com/swagger/marlinshopWork2/' + apiPathA;
    // this.myurl =
    //   'https://lovetoshopmall.com/swagger/marlinshopWork2/th/department/All/1';
    this.myurl = environment.apiUrl2 + '?code=L002';

    await this.http.get<any>(this.myurl).subscribe((data) => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      console.table('Data9999 For Select List', data);
      //alert(data);
      this.dataInit = data;
      this.results = this.dataInit;
      this.heroesA = this.dataInit;
      this.heroesB = this.heroesA;
      this.showDelete = false;

      //this.myListChange.emit(this.sData);
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

  setToList(e: any) {
    //console.log(this.heroesA.length, ' vs ', this.heroesB.length);

    if (this.heroesA.length != this.heroesB.length) {
      this.myData = this.heroesB[e][1].trim();
      this.id = this.heroesB[e][0];
    } else {
      this.myData = this.heroesA[e][1].trim();
      this.id = this.heroesB[e][0];
    }
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
    var element = this.renderer.selectRootElement('#myInput');
    element.focus();
  }
}
