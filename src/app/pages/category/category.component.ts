import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

import { full_categoryModel } from '../../_models/category';
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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  formModal: any;
  varmodelTable: modelTable = {
    apiTable: 'category',
    Caption: 'หมวดสินค้า',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  categoryModel: full_categoryModel = {
    id: 2,
  };

  id: number = 1;
  ModelName: string = 'category';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-หมวดสินค้า ';

  stageCrud: boolean = true;
  stageForm: boolean = true;
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      id: ['', Validators.required],
      categorycode: ['', Validators.required],
      lang: ['', Validators.required],
      categoryDesc: ['', Validators.required],
      imageName: ['', Validators.required],
      grandParentCode: ['', Validators.required],
      departmentID: ['', Validators.required],
      TotalProduct: ['', Validators.required],
    });

    if (this._Activatedroute.snapshot.paramMap.get('id')) {
      //alert(this._Activatedroute.snapshot.paramMap.get('id'));
      let id = this._Activatedroute.snapshot.paramMap.get('id');
      this.myForm.get('id').setValue(id);
      if (id != 'new') {
        this.formTitle = 'แก้ไขข้อมูล -' + this.varmodelTable.Caption;
        this.getByID(id);
      } else {
        this.formTitle = 'เพิ่มข้อมูล ::' + this.varmodelTable.Caption;
      }
    }
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
    this.myForm.get('categorycode').setValue('');
    this.myForm.get('lang').setValue('');
    this.myForm.get('categoryDesc').setValue('');
    this.myForm.get('imageName').setValue('');
    this.myForm.get('grandParentCode').setValue('');
    this.myForm.get('departmentID').setValue('');
    this.myForm.get('TotalProduct').setValue('');
  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.categoryModel = response;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);
      this.myForm.get('categorycode').setValue(response.categorycode);
      this.myForm.get('lang').setValue(response.lang);
      this.myForm.get('categoryDesc').setValue(response.categoryDesc);
      this.myForm.get('imageName').setValue(response.imageName);
      this.myForm.get('grandParentCode').setValue(response.grandParentCode);
      this.myForm.get('departmentID').setValue(response.departmentID);
      this.myForm.get('TotalProduct').setValue(response.TotalProduct);

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

  saveCategory() {}

  searchCategory() {}

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
