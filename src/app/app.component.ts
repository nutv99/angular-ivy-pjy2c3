import { Component, VERSION, OnInit } from '@angular/core';
import $ from 'jquery';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Mainmenu } from './shared/mainmenu';

import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

//<i class="fa-solid fa-chevrons-right"></i>

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  isJqueryWorking: string;
  filmIcon = faFilm;
  faChevronCircleRight = faChevronCircleRight;
  faHamburger = faBars;
  //menu = Mainmenu.;

  menu = [
    {
      HeadCaption: 'ฐานข้อมูลหลัก',
      Child: [
        {
          name: 'Deparment',
          linkTo: '/departmentList/1',
          caption: 'แผนกสินค้า',
        },        
        {
          name: 'category',
          linkTo: 'category/1',
          caption: 'หมวดสินค้า',
        },
        {
          name: 'groupItem88',
          linkTo: 'group/1',
          caption: 'กลุ่มสินค้า88',
        },
        {
          name: 'tbldocument',
          linkTo: 'tbldocument/1',
          caption: 'เอกสาร',
        },
      ],
    },
    {
      HeadCaption: 'ฐานข้อมูลTrans',
      Child: [
        {
          name: 'DeparmentTrans',
          linkTo: '/department',
          caption: 'A-แผนกสินค้า',
        },
        {
          name: 'categoryTrans',
          linkTo: '/category',
          caption: 'A-หมวดสินค้า',
        },
        {
          name: 'groupItemTrans',
          linkTo: '/',
          caption: 'A-กลุ่มสินค้า',
        },
      ],
    },
    {
      HeadCaption: 'ระบบรายงาน',
      Child: [
        {
          name: 'DeparmentTrans',
          linkTo: '/',
          caption: 'A-แผนกสินค้า',
        },
        {
          name: 'categoryTrans',
          linkTo: '/',
          caption: 'A-หมวดสินค้า',
        },
        {
          name: 'groupItemTrans',
          linkTo: '/',
          caption: 'A-กลุ่มสินค้า',
        },
      ],
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    $(document).ready(() => {
      this.isJqueryWorking = 'Jquery is working 9999!!!';

      // $('select').selectize({
      //   sortField: 'text',
      // });
    });
  }

  ToggleSideBar() {
    //$('#testdiv').html('99999');
    // if (!$("#testdiv").hasClass('myBorder')) {
    //   $("#testdiv").addClass('myBorder')
    // } else {
    //   $("#testdiv").removeClass('myBorder').addClass('myBorder2')
    // }
    //$('#testdiv').toggleClass('collapsed') ;
    //$('#testdiv').toggleClass('collapsed');
    $('#sidemenu').toggleClass('nodisplay');
    $('#workarea').toggleClass('col-sm-12 ml10');
    //$('#workarea').addClass('ml10');

    //workarea

    // document.querySelector('button').addEventListener('click', () => { document.querySelector('.collapsible').classList.toggle('collapsed');});
  }

  HideMenu(id: string) {
    $('#' + id).animate(
      {
        height: 'toggle',
      },
      500,
      function () {
        // Animation complete.
      }
    );
  }
}
