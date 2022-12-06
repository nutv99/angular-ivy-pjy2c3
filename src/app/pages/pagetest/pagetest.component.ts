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



@Component({
  selector: 'app-pagetest',
  templateUrl: './pagetest.component.html',
  styleUrls: ['./pagetest.component.css'],
})

// templateUrl: './department.component.html',
export class PagetestComponent implements OnInit {
  faDatabaseIcon = faDatabase;
  faFileIcon = faFile;
  faPrintIcon = faPrint;
  faGlobeIcon = faGlobe;
  faCheckIcon = faCheck;
  faAddressBookIcon = faAddressBook;

  constructor() {}

  ngOnInit() {}
}
