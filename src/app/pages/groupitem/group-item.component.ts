import { Component, OnInit } from '@angular/core';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css'],
})
export class GroupItemComponent implements OnInit {
  myOutput: any = {};
  dataChild: any ;

  constructor() {}

  ngOnInit() {
    this.dataChild = [
      {
        '0': 'A12_1',
        '1': 'รถยนต์และอุปกรณ์',
        categoryCode: 'A12_1',
        categoryDesc: 'รถยนต์และอุปกรณ์ ',
      },
    ];
  }

  setChildData(e: any) {
    alert(e.target.value);
    console.log('on groupitem', e);
  }

  testNumBerChange(value) {
    console.log('ssss', value);
    this.dataChild = value;
    console.log('DataChild', JSON.stringify(this.dataChild));
  }
}
