import { Component, OnInit } from '@angular/core';

export interface modelTable {
  apiTable: string;
  Caption: string;
  pageno: number;
  headerColTable: string[];
  ParentTableList: string[];
}

@Component({
  selector: 'app-company-option',
  templateUrl: './company-option.component.html',
  styleUrls: ['./company-option.component.css'],
})
export class CompanyOptionComponent implements OnInit {
  varmodelTable: modelTable = {
    apiTable: 'category',
    Caption: 'แผนกสินค้า',
    pageno: 1,
    headerColTable: ['รหัสแผนก', 'ชื่อแผนก', 'รหัส-2', 'รูป'],
    ParentTableList: [],
  };
  constructor() {}

  ngOnInit() {}
}
