import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_paymentchannelModel } from '../../_models/paymentchannel';
import { full_paymentchannelModel } from './paymentchannel';
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
  selector: 'app-paymentchannel',
  templateUrl: './paymentchannel.component.html',
  styleUrls: ['./paymentchannel.component.css'],
})


export class PaymentchannelComponent implements OnInit {
  formCode: string = 'A004';
  formModal: any;

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'A004',
    apiTable: 'paymentchannel',
    formNameEdit: 'paymentchannel',
    Caption: 'ddhousin_tshop',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  paymentchannelModel: full_paymentchannelModel = {
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
  ModelName: string = 'paymentchannel';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-ddhousin_tshop ';

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
      lcIsEnabled: ['', Validators.required],
      lcDisplayName: ['', Validators.required],
      lcDescription: ['', Validators.required],
      lcPaymentImage: ['', Validators.required],
      uxIsDiscountLabel: ['', Validators.required],
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
            //this.myForm.id = result.DataResult.id;
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

    this.myForm.get('id').setValue('');
    this.myForm.get('lcIsEnabled').setValue('');
    this.myForm.get('lcDisplayName').setValue('');
    this.myForm.get('lcDescription').setValue('');
    this.myForm.get('lcPaymentImage').setValue('');
    this.myForm.get('uxIsDiscountLabel').setValue('');
  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.paymentchannelModel = response;
      this.FormMode = 'put';
      response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);
      this.myForm.get('lcIsEnabled').setValue(response.lcIsEnabled);
      this.myForm.get('lcDisplayName').setValue(response.lcDisplayName);
      this.myForm.get('lcDescription').setValue(response.lcDescription);
      this.myForm.get('lcPaymentImage').setValue(response.lcPaymentImage);
      this.myForm.get('uxIsDiscountLabel').setValue(response.uxIsDiscountLabel);

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

  savePaymentchannel() {}

  searchPaymentchannel() {}

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

  paymentchannel_Emit(e: any) {
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
