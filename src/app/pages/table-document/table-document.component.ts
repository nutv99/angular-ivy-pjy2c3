import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

import { full_tbl_documentModel } from '../../_models/tbl_document';
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
  apiTable: string;
  Caption: string;
  headerColTable: string[];
  ParentTableList: string[];
}

@Component({
  selector: 'app-tbl_document',
  templateUrl: './table-document.component.html',
  styleUrls: ['./table-document.component.css'],
})
export class TableDocumentComponent implements OnInit {
  formModal: any;
  varmodelTable: modelTable = {
    apiTable: 'tbl_document',
    Caption: 'ตารางเอกสารย่อย',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  tbl_documentModel: full_tbl_documentModel = {
    id: 2

  };

  id: number = 1;
  ModelName: string = 'tbl_document';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-ตารางเอกสารย่อย ';

  stageCrud: boolean = true;
  stageForm: boolean = false;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService) {}

  ngOnInit() {
    /*this.myForm = this.fb.group({
      id: [''],
      tbl_documentCode: [''],
      tbl_documentDesc: [''],
      lang: [''],
      imageName: [''],
    });
	*/
	
this.myForm = this.fb.group({
id : ['',Validators.required],lang : ['',Validators.required],DOC_ID : ['',Validators.required],DOC_NO : ['',Validators.required],DOC_DATE : ['',Validators.required],DOC_YEAR : ['',Validators.required],DOC_DESCRIPTION : ['',Validators.required],DOC_TYPE : ['',Validators.required],SUPPLIER : ['',Validators.required],DOC_START_DATE : ['',Validators.required],DOC_END_DATE : ['',Validators.required],COST_ID : ['',Validators.required],DOC_LOCATION_REF : ['',Validators.required],DOC_REFERENCE_COM : ['',Validators.required],DOC_REFERENCE_DOC : ['',Validators.required],DOC_ATTACH : ['',Validators.required],DOC_REMARK : ['',Validators.required],DOC_STATUS : ['',Validators.required],USER_CREATE : ['',Validators.required],USER_UPDATE : ['',Validators.required],CREATE_DATE : ['',Validators.required],UPDATE_DATE : ['',Validators.required],HW_WARANTEE : ['',Validators.required],HW_WAR_YEAR : ['',Validators.required],DOC_GROUP : ['',Validators.required],COST_SECTION : ['',Validators.required],upsize_ts : ['',Validators.required]});

  }

  get f() {
    return this.myForm.controls;
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
      this.apiService
        .create(this.ModelName, PayLoad)
        .subscribe((response: any) => {
          this.alertWithSuccess();
        });
    }

    if (this.FormMode === 'patch') {
      let PayLoad = {
        dataPayload: this.myForm.value,
      };
      // alert('Update')
      this.apiService
        .update999(this.ModelName, PayLoad)
        .subscribe((response: any) => {
          // alert('Success Update');
          this.alertWithSuccess();
        });
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
this.myForm.get('lang').setValue('');
this.myForm.get('DOC_ID').setValue('');
this.myForm.get('DOC_NO').setValue('');
this.myForm.get('DOC_DATE').setValue('');
this.myForm.get('DOC_YEAR').setValue('');
this.myForm.get('DOC_DESCRIPTION').setValue('');
this.myForm.get('DOC_TYPE').setValue('');
this.myForm.get('SUPPLIER').setValue('');
this.myForm.get('DOC_START_DATE').setValue('');
this.myForm.get('DOC_END_DATE').setValue('');
this.myForm.get('COST_ID').setValue('');
this.myForm.get('DOC_LOCATION_REF').setValue('');
this.myForm.get('DOC_REFERENCE_COM').setValue('');
this.myForm.get('DOC_REFERENCE_DOC').setValue('');
this.myForm.get('DOC_ATTACH').setValue('');
this.myForm.get('DOC_REMARK').setValue('');
this.myForm.get('DOC_STATUS').setValue('');
this.myForm.get('USER_CREATE').setValue('');
this.myForm.get('USER_UPDATE').setValue('');
this.myForm.get('CREATE_DATE').setValue('');
this.myForm.get('UPDATE_DATE').setValue('');
this.myForm.get('HW_WARANTEE').setValue('');
this.myForm.get('HW_WAR_YEAR').setValue('');
this.myForm.get('DOC_GROUP').setValue('');
this.myForm.get('COST_SECTION').setValue('');
this.myForm.get('upsize_ts').setValue('');


  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.tbl_documentModel = response;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);this.myForm.get('lang').setValue(response.lang);this.myForm.get('DOC_ID').setValue(response.DOC_ID);this.myForm.get('DOC_NO').setValue(response.DOC_NO);this.myForm.get('DOC_DATE').setValue(response.DOC_DATE);this.myForm.get('DOC_YEAR').setValue(response.DOC_YEAR);this.myForm.get('DOC_DESCRIPTION').setValue(response.DOC_DESCRIPTION);this.myForm.get('DOC_TYPE').setValue(response.DOC_TYPE);this.myForm.get('SUPPLIER').setValue(response.SUPPLIER);this.myForm.get('DOC_START_DATE').setValue(response.DOC_START_DATE);this.myForm.get('DOC_END_DATE').setValue(response.DOC_END_DATE);this.myForm.get('COST_ID').setValue(response.COST_ID);this.myForm.get('DOC_LOCATION_REF').setValue(response.DOC_LOCATION_REF);this.myForm.get('DOC_REFERENCE_COM').setValue(response.DOC_REFERENCE_COM);this.myForm.get('DOC_REFERENCE_DOC').setValue(response.DOC_REFERENCE_DOC);this.myForm.get('DOC_ATTACH').setValue(response.DOC_ATTACH);this.myForm.get('DOC_REMARK').setValue(response.DOC_REMARK);this.myForm.get('DOC_STATUS').setValue(response.DOC_STATUS);this.myForm.get('USER_CREATE').setValue(response.USER_CREATE);this.myForm.get('USER_UPDATE').setValue(response.USER_UPDATE);this.myForm.get('CREATE_DATE').setValue(response.CREATE_DATE);this.myForm.get('UPDATE_DATE').setValue(response.UPDATE_DATE);this.myForm.get('HW_WARANTEE').setValue(response.HW_WARANTEE);this.myForm.get('HW_WAR_YEAR').setValue(response.HW_WAR_YEAR);this.myForm.get('DOC_GROUP').setValue(response.DOC_GROUP);this.myForm.get('COST_SECTION').setValue(response.COST_SECTION);this.myForm.get('upsize_ts').setValue(response.upsize_ts);


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

  saveTbl_document() {}

  searchTbl_document() {}

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

  // openFormModal() {
  //   this.formModal.show();
  // }
  // saveSomeThing() {
  //   // confirm or save something
  //   this.formModal.hide();
  // }
}
