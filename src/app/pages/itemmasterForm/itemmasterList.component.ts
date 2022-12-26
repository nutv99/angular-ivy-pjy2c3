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
  selector: 'app-itemmasterList',
  templateUrl: './itemmasterList.component.html',
  styleUrls: ['./itemmasterForm.component.css'],
})
export class ItemmasterListComponent implements OnInit, OnChanges {
  formModal: any;
  pageid: string = '';
  pageno: string = this._Activatedroute.snapshot.paramMap.get('pageno');

  varmodelTable: modelTable = {
    apiTable: 'new',
    Caption: 'ddhousin_tshop',
    pageno: 1,
    headerColTable: ['รหัสแผนก', 'ชื่อแผนก', 'รหัส-2', 'รูป'],
    ParentTableList: [],
  };

  constructor(private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {

    if (this._Activatedroute.snapshot.paramMap.get('pageid')) {
      this.pageid = this.pageid = 'Itemmaster';
      console.log('PageID', this.pageid);
      // this.pageno = this._Activatedroute.snapshot.paramMap.get('pageno');
    } else {
      // this.pageno = '1';
    }

    this.pageid = 'Itemmaster';
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

  OnDeleteItemmaster(e: any) {
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
