export class Mainmenu {

  public menu = [
    {
      HeadCaption: 'ฐานข้อมูลหลัก',
      Child: [
        {
          name: 'Deparment',
          linkTo: '/crud/department/1',
          caption: 'แผนกสินค้า',
        },
        {
          name: 'category',
          linkTo: 'crud/category/1',
          caption: 'หมวดสินค้า',
        },
        {
          name: 'groupItem',
          linkTo: 'group/1',
          caption: 'กลุ่มสินค้า',
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
}