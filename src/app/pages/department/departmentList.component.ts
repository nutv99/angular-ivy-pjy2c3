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
  selector: 'app-departmentList',
  templateUrl: './departmentList.component.html',
  styleUrls: ['./department.component.css'],
})
export class departmentListComponent implements OnInit, OnChanges {
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

    if (this._Activatedroute.snapshot.paramMap.get('pageid')) {
      this.pageid = this.pageid = 'Department';
      console.log('PageID', this.pageid);
      // this.pageno = this._Activatedroute.snapshot.paramMap.get('pageno');
    } else {
      // this.pageno = '1';
    }

    this.pageid = 'Department';
    this.pageno = this._Activatedroute.snapshot.paramMap.get('pageno');

    //this.varmodelTable.apiTable = this.pageid;
    this.varmodelTable.pageno = parseInt(this.pageno);
    //console.log('PageID', this.pageid);
  }

  ngOnChanges() {
    console.log('On Change');
    this.pageid = this._Activatedroute.snapshot.paramMap.get('pageid');

    //this.varmodelTable.apiTable = this.pageid;
    this.varmodelTable.pageno = parseInt(this.pageid);
  }

  OnDeleteDepartment(e: any) {
    alert(e);
    /*let id = e;
    this.apiService.delete999(this.ModelName, id).subscribe((response: any) => {
      this.myForm.setValue(response);
    });
    alert('Delete ?' + e);
     this.confirmBox();
    //return;
    this.myForm.get('id').setValue(e);
    this.FormMode = 'delete';
    this.getByID(e);
	*/
  }
}
