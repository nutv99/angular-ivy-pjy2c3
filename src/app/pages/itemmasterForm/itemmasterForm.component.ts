import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_itemmasterModel } from '../../_models/itemmaster';
import { full_itemmasterModel } from './itemmasterModel';
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
  selector: 'app-itemmasterForm',
  templateUrl: './itemmasterForm.component.html',
  styleUrls: ['./itemmasterForm.component.css'],
})



export class ItemmasterFormComponent implements OnInit {

  formCode : string = 'new' ;
  formModal: any;

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'new',
    apiTable: 'itemmaster',
	formNameEdit : 'itemmaster',
    Caption: 'ddhousin_tshop',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  itemmasterModel: full_itemmasterModel = {
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
  ModelName: string = 'itemmaster';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-ddhousin_tshop ';

  stageCrud: boolean = true;
  stageForm: boolean = true;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService,private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {

	
this.myForm = this.fb.group({
id : ['',Validators.required],itemCode : ['',Validators.required],itemName : ['',Validators.required],itemmasterDesc : ['',Validators.required],itemCost : ['',Validators.required],fullPrice : ['',Validators.required],salePrice : ['',Validators.required],itemmasterDescLong : ['',Validators.required],item_width : ['',Validators.required],item_height : ['',Validators.required],item_long : ['',Validators.required],weight : ['',Validators.required],mainImage : ['',Validators.required],imageList : ['',Validators.required],departmentID : ['',Validators.required],categoryID : ['',Validators.required],groupID : ['',Validators.required],brandID : ['',Validators.required],stocktypeID : ['',Validators.required],assignUnitPrice : ['',Validators.required],flashSale : ['',Validators.required],manufactur : ['',Validators.required],model : ['',Validators.required],partNo : ['',Validators.required],UPC : ['',Validators.required],metaTitle : ['',Validators.required],metaDesc : ['',Validators.required],metaKeyword : ['',Validators.required],discountID : ['',Validators.required],vattypeID : ['',Validators.required],vatRate : ['',Validators.required],groupFriendID : ['',Validators.required],searchKeyword : ['',Validators.required],itemstatusID : ['',Validators.required]});

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

    if (this.FormMode === 'patch') {
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

    this.myForm.get('id').setValue('');
this.myForm.get('itemCode').setValue('');
this.myForm.get('itemName').setValue('');
this.myForm.get('itemmasterDesc').setValue('');
this.myForm.get('itemCost').setValue('');
this.myForm.get('fullPrice').setValue('');
this.myForm.get('salePrice').setValue('');
this.myForm.get('itemmasterDescLong').setValue('');
this.myForm.get('item_width').setValue('');
this.myForm.get('item_height').setValue('');
this.myForm.get('item_long').setValue('');
this.myForm.get('weight').setValue('');
this.myForm.get('mainImage').setValue('');
this.myForm.get('imageList').setValue('');
this.myForm.get('departmentID').setValue('');
this.myForm.get('categoryID').setValue('');
this.myForm.get('groupID').setValue('');
this.myForm.get('brandID').setValue('');
this.myForm.get('stocktypeID').setValue('');
this.myForm.get('assignUnitPrice').setValue('');
this.myForm.get('flashSale').setValue('');
this.myForm.get('manufactur').setValue('');
this.myForm.get('model').setValue('');
this.myForm.get('partNo').setValue('');
this.myForm.get('UPC').setValue('');
this.myForm.get('metaTitle').setValue('');
this.myForm.get('metaDesc').setValue('');
this.myForm.get('metaKeyword').setValue('');
this.myForm.get('discountID').setValue('');
this.myForm.get('vattypeID').setValue('');
this.myForm.get('vatRate').setValue('');
this.myForm.get('groupFriendID').setValue('');
this.myForm.get('searchKeyword').setValue('');
this.myForm.get('itemstatusID').setValue('');


  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.itemmasterModel = response;
	  this.FormMode = 'put';
	  response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);this.myForm.get('itemCode').setValue(response.itemCode);this.myForm.get('itemName').setValue(response.itemName);this.myForm.get('itemmasterDesc').setValue(response.itemmasterDesc);this.myForm.get('itemCost').setValue(response.itemCost);this.myForm.get('fullPrice').setValue(response.fullPrice);this.myForm.get('salePrice').setValue(response.salePrice);this.myForm.get('itemmasterDescLong').setValue(response.itemmasterDescLong);this.myForm.get('item_width').setValue(response.item_width);this.myForm.get('item_height').setValue(response.item_height);this.myForm.get('item_long').setValue(response.item_long);this.myForm.get('weight').setValue(response.weight);this.myForm.get('mainImage').setValue(response.mainImage);this.myForm.get('imageList').setValue(response.imageList);this.myForm.get('departmentID').setValue(response.departmentID);this.myForm.get('categoryID').setValue(response.categoryID);this.myForm.get('groupID').setValue(response.groupID);this.myForm.get('brandID').setValue(response.brandID);this.myForm.get('stocktypeID').setValue(response.stocktypeID);this.myForm.get('assignUnitPrice').setValue(response.assignUnitPrice);this.myForm.get('flashSale').setValue(response.flashSale);this.myForm.get('manufactur').setValue(response.manufactur);this.myForm.get('model').setValue(response.model);this.myForm.get('partNo').setValue(response.partNo);this.myForm.get('UPC').setValue(response.UPC);this.myForm.get('metaTitle').setValue(response.metaTitle);this.myForm.get('metaDesc').setValue(response.metaDesc);this.myForm.get('metaKeyword').setValue(response.metaKeyword);this.myForm.get('discountID').setValue(response.discountID);this.myForm.get('vattypeID').setValue(response.vattypeID);this.myForm.get('vatRate').setValue(response.vatRate);this.myForm.get('groupFriendID').setValue(response.groupFriendID);this.myForm.get('searchKeyword').setValue(response.searchKeyword);this.myForm.get('itemstatusID').setValue(response.itemstatusID);


      //this.myForm.get('Mode').setValue('patch');
    });
  }

  setIDOnForm(e: any) {
    console.log('On Form ' + e);
    this.myForm.get('id').setValue(e);
    this.FormMode = 'patch';
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

  saveItemmaster() {}

  searchItemmaster() {}

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

  itemmaster_Emit(e:any) {
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
