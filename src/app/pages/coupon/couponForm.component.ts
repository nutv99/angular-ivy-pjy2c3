import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_couponModel } from '../../_models/coupon';
import { full_couponModel } from './couponModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CustomvalidationService } from '../services/customvalidation.service';
import { APIService } from '../../_services/api.service';

import Swal from 'sweetalert2';

import { TYPE } from '../../shared/values.constants';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

declare var window: any;
export interface modelTable {
  formCode:string;
  apiTable: string;
  Caption: string;
  formNameEdit:string;
  headerColTable: string[];
  ParentTableList: string[];
}

@Component({
  selector: 'app-couponForm',
  templateUrl: './couponForm.component.html',
  styleUrls: ['./couponForm.component.scss'],
})



export class CouponFormComponent implements OnInit {

  formCode : string = 'A012' ;
  formModal: any;
  model:string = '';

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'A012',
    apiTable: 'coupon',
	formNameEdit : 'couponForm',
    Caption: 'coupon',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  couponModel: full_couponModel = {
    id: 2
  };

  dataInit = [
    {
      ID: 1,
      '0': 1,
      categoryDesc:
        'เลือก...',
      '1': 'เลือก...',
    },
  ];

  id: number = 1;
  ModelName: string = 'coupon';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-coupon ';

  stageCrud: boolean = true;
  stageForm: boolean = true;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService,private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {

	
this.myForm = this.fb.group({
id : ['',Validators.required],uxCouponIDLabel : ['',Validators.required],discountTypeID : ['',Validators.required],uxDiscountAmountLabel : ['',Validators.required],expirationTypeID : ['',Validators.required],uxExpirationDateLabel : ['',Validators.required],uxCurrentQuantityLabel : ['',Validators.required],uxMinimumSubtotalLabel : ['',Validators.required],uxDiscountByLabel : ['',Validators.required],uxMerchantNotesLabel : ['',Validators.required],uxAllProductRadio : ['',Validators.required],productID : ['',Validators.required],categoryID : ['',Validators.required],uxProductExamLabel : ['',Validators.required],uxCustomerIDRadio : ['',Validators.required],uxCustomerExamLabel : ['',Validators.required],uxAllCustomerOnceOnlyRadio : ['',Validators.required],uxCustomerOnceOnly : ['',Validators.required],uxCustomerOneTimeExamLabel : ['',Validators.required]});

	if (this._Activatedroute.snapshot.paramMap.get('id')) {
      //alert(this._Activatedroute.snapshot.paramMap.get('id'));
      let id = this._Activatedroute.snapshot.paramMap.get('id');
      this.myForm.get('id').setValue(id);
      if (id != 'new') {
        this.formTitle = 'แก้ไขข้อมูล' + this.varmodelTable.Caption;;
        this.getByID(id);
      } else {
        this.formTitle = 'เพิ่มข้อมูล' +this.varmodelTable.Caption;;
      }
    }

  }

  get f() {
    return this.myForm.controls;
  }

  setChecked(fname) {

    if (this.myForm.get(fname).value === 'y') {
       this.myForm.get(fname).setValue('n')
    } else {
      this.myForm.get(fname).setValue('y')
    }

  }

  setStageForm() {
    if (this.stageForm === false) {
      this.stageForm = true;
      this.stageCrud = false;
    } else {
      this.stageForm = false;
      this.stageCrud = true;
    }
  }

/**************   Submit ****************/

  onSubmit() {
    //this.registerForm.valid
    if (this.myForm.invalid) {
      alert('Cannot Submit');
      return;
    }

    if (this.FormMode === 'post') {
      let PayLoad = {
        dataPayload: this.myForm.value,
      };
      this.apiService.create(this.ModelName, PayLoad).subscribe({
        next: (result: any) => {
          if (result.resultstatus === 'success') {
			//this.myForm.id = result.DataResult;
			this.myForm.get('id').setValue(result.DataResult.id);
			this.FormMode = 'put';
            this.alertWithSuccess();
          } else {
            this.alertWithError(result.ErrorMsg);
          }
        },
        error: (error) => {
          this.alertWithError(error.message);
          console.error('There was an error!', error);
        },
      });


    }

    if (this.FormMode === 'put') {
      let PayLoad = {
        dataPayload: this.myForm.value,
      };
      // alert('Update')
      this.apiService
        .update999(this.ModelName, PayLoad)
        .subscribe({
          next: (result: any) => {
            if (result.resultstatus === 'success') {
              this.alertWithSuccess();
            } else {
              this.alertWithError(result.ErrorMsg);
            }
          },
          error: (error) => {
            this.alertWithError(error.message);
            console.error('There was an error!', error);
          },
      }

	     );
    }
    //this.apiService.create(payload)
  }

  closeForm() {
    this.stageForm = false;
    this.stageCrud = true;
  }

  newForm() {
    console.clear();
    this.FormMode === 'post';
    this.myForm.get('id').setValue('new');
this.myForm.get('uxCouponIDLabel').setValue('');
this.myForm.get('discountTypeID').setValue('');
this.myForm.get('uxDiscountAmountLabel').setValue('');
this.myForm.get('expirationTypeID').setValue('');
this.myForm.get('uxExpirationDateLabel').setValue('');
this.myForm.get('uxCurrentQuantityLabel').setValue('');
this.myForm.get('uxMinimumSubtotalLabel').setValue('');
this.myForm.get('uxDiscountByLabel').setValue('');
this.myForm.get('uxMerchantNotesLabel').setValue('');
this.myForm.get('uxAllProductRadio').setValue('');
this.myForm.get('productID').setValue('');
this.myForm.get('categoryID').setValue('');
this.myForm.get('uxProductExamLabel').setValue('');
this.myForm.get('uxCustomerIDRadio').setValue('');
this.myForm.get('uxCustomerExamLabel').setValue('');
this.myForm.get('uxAllCustomerOnceOnlyRadio').setValue('');
this.myForm.get('uxCustomerOnceOnly').setValue('');
this.myForm.get('uxCustomerOneTimeExamLabel').setValue('');


  }

  setFormDataTest() {
	let r = (Math.random() + 1).toString(36).substring(7);
    this.myForm.get('id').setValue('new' + r);
this.myForm.get('uxCouponIDLabel').setValue('รหัสคูปอง *' + r);
this.myForm.get('discountTypeID').setValue('รหัสส่วนลด' + r);
this.myForm.get('uxDiscountAmountLabel').setValue('จำนวนส่วนลด *' + r);
this.myForm.get('expirationTypeID').setValue('expirationTypeID' + r);
this.myForm.get('uxExpirationDateLabel').setValue('วันหมดอายุ *' + r);
this.myForm.get('uxCurrentQuantityLabel').setValue('จำนวนที่ถูกใช้ไปแล้ว' + r);
this.myForm.get('uxMinimumSubtotalLabel').setValue('ยอดรวมขั้นต่ำที่ต้องการสำหรับการใช้คูปองนี้' + r);
this.myForm.get('uxDiscountByLabel').setValue('รวมราคาสินค้าจาก' + r);
this.myForm.get('uxMerchantNotesLabel').setValue('โน๊ต (สำหรับพ่อค้า)' + r);
this.myForm.get('uxAllProductRadio').setValue('สินค้าทุกตัว' + r);
this.myForm.get('productID').setValue('รหัสสินค้า' + r);
this.myForm.get('categoryID').setValue('รหัสกลุ่มสินค้า' + r);
this.myForm.get('uxProductExamLabel').setValue('(เช่น : 1,2,3,...)' + r);
this.myForm.get('uxCustomerIDRadio').setValue('บัญชีผู้ใช้' + r);
this.myForm.get('uxCustomerExamLabel').setValue('(เช่น : User1,User2,User3,...)' + r);
this.myForm.get('uxAllCustomerOnceOnlyRadio').setValue('บัญชีผู้ใช้ทุกคน (ใช้ได้เพียงครั้งเดียว)' + r);
this.myForm.get('uxCustomerOnceOnly').setValue('บัญชีผู้ใช้ (ใช้ได้เพียงครั้งเดียว)' + r);
this.myForm.get('uxCustomerOneTimeExamLabel').setValue('(เช่น : User1,User2,User3,...)' + r);

  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.couponModel = response;
	  this.FormMode = 'put';
	  response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);this.myForm.get('uxCouponIDLabel').setValue(response.uxCouponIDLabel);this.myForm.get('discountTypeID').setValue(response.discountTypeID);this.myForm.get('uxDiscountAmountLabel').setValue(response.uxDiscountAmountLabel);this.myForm.get('expirationTypeID').setValue(response.expirationTypeID);this.myForm.get('uxExpirationDateLabel').setValue(response.uxExpirationDateLabel);this.myForm.get('uxCurrentQuantityLabel').setValue(response.uxCurrentQuantityLabel);this.myForm.get('uxMinimumSubtotalLabel').setValue(response.uxMinimumSubtotalLabel);this.myForm.get('uxDiscountByLabel').setValue(response.uxDiscountByLabel);this.myForm.get('uxMerchantNotesLabel').setValue(response.uxMerchantNotesLabel);this.myForm.get('uxAllProductRadio').setValue(response.uxAllProductRadio);this.myForm.get('productID').setValue(response.productID);this.myForm.get('categoryID').setValue(response.categoryID);this.myForm.get('uxProductExamLabel').setValue(response.uxProductExamLabel);this.myForm.get('uxCustomerIDRadio').setValue(response.uxCustomerIDRadio);this.myForm.get('uxCustomerExamLabel').setValue(response.uxCustomerExamLabel);this.myForm.get('uxAllCustomerOnceOnlyRadio').setValue(response.uxAllCustomerOnceOnlyRadio);this.myForm.get('uxCustomerOnceOnly').setValue(response.uxCustomerOnceOnly);this.myForm.get('uxCustomerOneTimeExamLabel').setValue(response.uxCustomerOneTimeExamLabel);

     
      //this.myForm.get('Mode').setValue('patch');
    });
  }

  setIDOnForm(e: any) {
    console.log('On Form ' + e);
    this.myForm.get('id').setValue(e);
    this.FormMode = 'put';
    this.getByID(e);
    this.setStageForm();
  }

  OnDelete(e: any) {
    console.log('On Form ' + e);
    let id = e;
    this.apiService.delete999(this.ModelName, id).subscribe((response: any) => {
      this.myForm.setValue(response);
    });
    //alert('Delete ?' + e);
    //this.confirmBox();
    //return;
    this.myForm.get('id').setValue(e);
    this.FormMode = 'delete';
    this.getByID(e);
  }

  saveCoupon() {}

  searchCoupon() {}

/******************* ALERT SECTION ************************/

  alertWithError(errormsg) {
    //alert('Error');
    Swal.fire('ล้มเหลว...', 'การบันทึกข้อมูล ไม่สำเร็จ!', 'error');
    console.log('Post Result :: ', errormsg);
  }

  confirmBox() {
    Swal.fire({
      title: 'ท่านต้องการ ลบข้อมูลนี้ ?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  simpleAlert() {
    Swal.fire('Hello world!');
  }

  alertWithSuccess() {
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
  }

  coupon_Emit(e:any) {
     this.dataInit  = e ;

  }

  reciveOutSelect(e: any, varname) {
    this.myForm.get(varname).setValue(e);
  }

  setYesNoValue(e:any,fname:string) {

    this.myForm.get(fname).setValue(e)

  }

  setOutSelect(e:any,fname:string) {

    this.myForm.get(fname).setValue(e)

  }

  // openFormModal() {
  //   this.formModal.show();
  // }
  // saveSomeThing() {
  //   // confirm or save something
  //   this.formModal.hide();
  // }
}
