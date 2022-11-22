import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

declare var window: any;
export interface modelTable {
  apiTable: string;
  Caption: string;
  pageno: number;
  headerColTable: string[];
  ParentTableList: string[];
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit, OnChanges {
  formModal: any;
  pageid: string = '';
  pageno: string = this._Activatedroute.snapshot.paramMap.get('pageno');

  varmodelTable: modelTable = {
    apiTable: 'department',
    Caption: 'แผนกสินค้า',
    pageno: 1,
    headerColTable: ['รหัสแผนก', 'ชื่อแผนก', 'รหัส-2', 'รูป'],
    ParentTableList: [],
  };

  constructor(private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {
    // this.formModal = new window.bootstrap.Modal(
    //   document.getElementById('myModal')
    // );

    if (this._Activatedroute.snapshot.paramMap.get('pageid')) {
      this.pageid = this._Activatedroute.snapshot.paramMap.get('pageid');
      //alert(this.pageno);
      console.log('PageID', this.pageid);
      // this.pageno = this._Activatedroute.snapshot.paramMap.get('pageno');
    } else {
      // this.pageno = '1';
    }

    this.pageid = this._Activatedroute.snapshot.paramMap.get('pageid');
    this.pageno = this._Activatedroute.snapshot.paramMap.get('pageno');

    this.varmodelTable.apiTable = this.pageid;
    this.varmodelTable.pageno = parseInt(this.pageid);
    //console.log('PageID', this.pageid);
  }

  ngOnChanges() {
    console.log('On Change');
    this.pageid = this._Activatedroute.snapshot.paramMap.get('pageid');

    this.varmodelTable.apiTable = this.pageid;
    this.varmodelTable.pageno = parseInt(this.pageid);
  }
}
