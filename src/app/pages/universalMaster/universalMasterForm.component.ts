import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_universalMasterModel } from '../../_models/universalMaster';
import { full_universalMasterModel } from './universalMasterModel';
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
  formCode: string;
  apiTable: string;
  Caption: string;
  formNameEdit: string;
  headerColTable: string[];
  ParentTableList: string[];
}

@Component({
  selector: 'app-universalMasterForm',
  templateUrl: './universalMasterForm.component.html',
  styleUrls: ['./universalMasterForm.component.scss'],
})
export class UniversalMasterFormComponent implements OnInit {
  formCode: string = 'A011';
  formModal: any;
  dataDefault = -1;

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'A011',
    apiTable: 'universalMaster',
    formNameEdit: 'universalMasterForm',
    Caption: 'universalMaster',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  universalMasterModel: full_universalMasterModel = {
    id: 2,
  };

  dataInit = [
    {
      ID: 1,
      '0': 1,
      categoryDesc: 'เลือก...',
      '1': 'เลือก...',
    },
  ];

  id: number = 1;
  ModelName: string = 'universalMaster';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-universalMaster ';

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
      universalListID: ['', Validators.required],
      code: ['', Validators.required],
      fieldDESC: ['', Validators.required],
    });

    if (this._Activatedroute.snapshot.paramMap.get('id')) {
      //alert(this._Activatedroute.snapshot.paramMap.get('id'));
      let id = this._Activatedroute.snapshot.paramMap.get('id');
      this.myForm.get('id').setValue(id);
      if (id != 'new') {
        this.formTitle = 'แก้ไขข้อมูล' + this.varmodelTable.Caption;
        this.getByID(id);
      } else {
        this.formTitle = 'เพิ่มข้อมูล' + this.varmodelTable.Caption;
      }
    }
  }

  get f() {
    return this.myForm.controls;
  }

  setChecked(fname) {
    if (this.myForm.get(fname).value === 'y') {
      this.myForm.get(fname).setValue('n');
    } else {
      this.myForm.get(fname).setValue('y');
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
      this.apiService.update999(this.ModelName, PayLoad).subscribe({
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
    this.FormMode = 'post';
    this.myForm.get('id').setValue('new');
    //this.myForm.get('universalListID').setValue('');
    this.myForm.get('code').setValue('');
    this.myForm.get('fieldDESC').setValue('');
  }

  setFormDataTest() {
    let r = (Math.random() + 1).toString(36).substring(7);
    this.myForm.get('id').setValue('new' + r);
    this.myForm.get('universalListID').setValue('universalListID' + r);
    this.myForm.get('code').setValue('รหัส' + r);
    this.myForm.get('fieldDESC').setValue('ชื่อ' + r);
  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.universalMasterModel = response;
      this.FormMode = 'put';
      response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);
      this.myForm.get('universalListID').setValue(response.universalListID);
      this.dataDefault = response.universalListID;

      this.myForm.get('code').setValue(response.code);
      this.myForm.get('fieldDESC').setValue(response.fieldDESC);

      //this.myForm.get('Mode').setValue('put');
    });
  }

  searchTextOnSelect() {}

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

  saveUniversalMaster() {}

  searchUniversalMaster() {}

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

  universalMaster_Emit(e: any) {
    this.dataInit = e;
  }

  reciveOutSelect(e: any, varname) {
    this.myForm.get(varname).setValue(e);
  }

  setYesNoValue(e: any, fname: string) {
    this.myForm.get(fname).setValue(e);
  }

  setOutSelect(e: any, fname: string) {
    this.myForm.get(fname).setValue(e);
  }

  // openFormModal() {
  //   this.formModal.show();
  // }
  // saveSomeThing() {
  //   // confirm or save something
  //   this.formModal.hide();
  // }
}
