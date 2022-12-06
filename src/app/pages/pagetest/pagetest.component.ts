import { Component, OnInit } from '@angular/core';

import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { faAddressBook } from '@fortawesome/free-solid-svg-icons';


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
