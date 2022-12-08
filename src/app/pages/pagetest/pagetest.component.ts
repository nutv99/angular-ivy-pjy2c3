import { Component, OnInit } from '@angular/core';

import {
  faFilm,
  faDatabase,
  faFile,
  faPrint,
  faGlobe,
  faCheck,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

export interface form_department {
  id: number;
  shopID: string;
  departmentCode: string;
  code2: number;
  departmentDesc: string;
  lang: string;
  imageName: string;
  faIcon: string;
  category: [
    {
      id: number;
      categorycode: string;
      lang: string;
      categoryDesc: string;
      imageName: string;
      grandParentCode: string;
      departmentID: number;
      TotalProduct: number;
    }
  ];
  grouptopic: [
    {
      categorycode: number;
      category: string;
      topiccode: number;
      topicdesc: string;
    }
  ];
}

@Component({
  selector: 'app-pagetest',
  templateUrl: './pagetest.component.html',
  styleUrls: ['./pagetest.component.css'],
})

// templateUrl: './department.component.html',
export class PagetestComponent implements OnInit {
  //
  faDatabaseIcon = faDatabase;
  faFileIcon = faFile;
  faPrintIcon = faPrint;
  faGlobeIcon = faGlobe;
  faCheckIcon = faCheck;
  faAddressBookIcon = faAddressBook;

  constructor() {}

  ngOnInit() {}

  SetDepartmentID(e: any) {
    alert(e);
  }

  // MyListChange(e: any) {
  //   alert(e);
  // }
}
