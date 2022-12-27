import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_dropshipModel } from '../../_models/dropship';
import { full_dropshipModel } from './dropshipModel';
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
  selector: 'app-dropshipForm',
  templateUrl: './dropshipForm.component.html',
  styleUrls: ['./dropshipForm.component.scss'],
})
export class DropshipFormComponent implements OnInit {
  formCode: string = 'undefined';
  formModal: any;

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'undefined',
    apiTable: 'dropship',
    formNameEdit: 'dropshipForm',
    Caption: 'dropship',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  dropshipModel: full_dropshipModel = {
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
  ModelName: string = 'dropship';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-dropship ';
  formEdit: string = this.varmodelTable.formNameEdit;

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
      uxCreatorLabel: ['', Validators.required],
      lcUserName: ['', Validators.required],
      lcPassword: ['', Validators.required],
      lcIsWholesale: ['', Validators.required],
      uxWholesaleLevelsLabel: ['', Validators.required],
      lcRegisterDate: ['', Validators.required],
      lcIsEnabled: ['', Validators.required],
      lcFirstName: ['', Validators.required],
      lcLastName: ['', Validators.required],
      lcCompany: ['', Validators.required],
      lcAddress: ['', Validators.required],
      uxDistrictLabel: ['', Validators.required],
      lcCity: ['', Validators.required],
      lcCountry: ['', Validators.required],
      lcState: ['', Validators.required],
      lcZip: ['', Validators.required],
      lcPhone: ['', Validators.required],
      lcEmail: ['', Validators.required],
      uxLineIDLabel: ['', Validators.required],
      uxUseBillingAsShippingLabel: ['', Validators.required],
      lcShippingFirstName: ['', Validators.required],
      lcShippingLastName: ['', Validators.required],
      lcShippingCompany: ['', Validators.required],
      lcShippingAddress: ['', Validators.required],
      uxShippingDistrictLabel: ['', Validators.required],
      lcShippingCity: ['', Validators.required],
      lcShippingCountry: ['', Validators.required],
      lcShippingState: ['', Validators.required],
      lcShippingZip: ['', Validators.required],
      lcShippingPhone: ['', Validators.required],
      lcShippingFax: ['', Validators.required],
      lcMerchantNotes: ['', Validators.required],
    });

    if (this._Activatedroute.snapshot.paramMap.get('id')) {
      //alert(this._Activatedroute.snapshot.paramMap.get('id'));
      let id = this._Activatedroute.snapshot.paramMap.get('id');
      this.myForm.get('id').setValue(id);
      if (id != 'new') {
        this.formTitle = 'แก้ไขข้อมูล-' + this.varmodelTable.Caption;
        this.getByID(id);
      } else {
        this.formTitle = 'เพิ่มข้อมูล-' + this.varmodelTable.Caption;
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

    if (this.FormMode === 'patch' || this.FormMode === 'put') {
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
    this.myForm.get('id').setValue('new');
    this.myForm.get('uxCreatorLabel').setValue('');
    this.myForm.get('lcUserName').setValue('');
    this.myForm.get('lcPassword').setValue('');
    this.myForm.get('lcIsWholesale').setValue('');
    this.myForm.get('uxWholesaleLevelsLabel').setValue('');
    this.myForm.get('lcRegisterDate').setValue('');
    this.myForm.get('lcIsEnabled').setValue('');
    this.myForm.get('lcFirstName').setValue('');
    this.myForm.get('lcLastName').setValue('');
    this.myForm.get('lcCompany').setValue('');
    this.myForm.get('lcAddress').setValue('');
    this.myForm.get('uxDistrictLabel').setValue('');
    this.myForm.get('lcCity').setValue('');
    this.myForm.get('lcCountry').setValue('');
    this.myForm.get('lcState').setValue('');
    this.myForm.get('lcZip').setValue('');
    this.myForm.get('lcPhone').setValue('');
    this.myForm.get('lcEmail').setValue('');
    this.myForm.get('uxLineIDLabel').setValue('');
    this.myForm.get('uxUseBillingAsShippingLabel').setValue('');
    this.myForm.get('lcShippingFirstName').setValue('');
    this.myForm.get('lcShippingLastName').setValue('');
    this.myForm.get('lcShippingCompany').setValue('');
    this.myForm.get('lcShippingAddress').setValue('');
    this.myForm.get('uxShippingDistrictLabel').setValue('');
    this.myForm.get('lcShippingCity').setValue('');
    this.myForm.get('lcShippingCountry').setValue('');
    this.myForm.get('lcShippingState').setValue('');
    this.myForm.get('lcShippingZip').setValue('');
    this.myForm.get('lcShippingPhone').setValue('');
    this.myForm.get('lcShippingFax').setValue('');
    this.myForm.get('lcMerchantNotes').setValue('');
  }

  setFormDataTest() {
    let r = (Math.random() + 1).toString(36).substring(7);
    this.myForm.get('id').setValue('new' + r);
    this.myForm.get('uxCreatorLabel').setValue('ผู้สร้าง *' + r);
    this.myForm.get('lcUserName').setValue('ชื่อผู้ใช้ *' + r);
    this.myForm.get('lcPassword').setValue('รหัสผ่าน *' + r);
    this.myForm.get('lcIsWholesale').setValue('ให้บัญชีนี้เป็น Dropship?' + r);
    this.myForm.get('uxWholesaleLevelsLabel').setValue('ระดับ Dropship' + r);
    this.myForm.get('lcRegisterDate').setValue('วันที่ลงทะเบียน' + r);
    this.myForm.get('lcIsEnabled').setValue('เปิดใช้งาน' + r);
    this.myForm.get('lcFirstName').setValue('ชื่อ *' + r);
    this.myForm.get('lcLastName').setValue('นามสกุล *' + r);
    this.myForm.get('lcCompany').setValue('บริษัท' + r);
    this.myForm.get('lcAddress').setValue('ที่อยู่ *' + r);
    this.myForm.get('uxDistrictLabel').setValue('แขวง/ตำบล *' + r);
    this.myForm.get('lcCity').setValue('เขต/อำเภอ *' + r);
    this.myForm.get('lcCountry').setValue('ประเทศ' + r);
    this.myForm.get('lcState').setValue('จังหวัด' + r);
    this.myForm.get('lcZip').setValue('รหัสไปรษณีย์ *' + r);
    this.myForm.get('lcPhone').setValue('โทรศัพท์ *' + r);
    this.myForm.get('lcEmail').setValue('อีเมล *' + r);
    this.myForm.get('uxLineIDLabel').setValue('LINE ID' + r);
    this.myForm
      .get('uxUseBillingAsShippingLabel')
      .setValue('จัดส่งสินค้าตามที่อยู่ด้านบน' + r);
    this.myForm.get('lcShippingFirstName').setValue('ชื่อ *' + r);
    this.myForm.get('lcShippingLastName').setValue('นามสกุล *' + r);
    this.myForm.get('lcShippingCompany').setValue('บริษัท' + r);
    this.myForm.get('lcShippingAddress').setValue('ที่อยู่ *' + r);
    this.myForm.get('uxShippingDistrictLabel').setValue('แขวง/ตำบล *' + r);
    this.myForm.get('lcShippingCity').setValue('เขต/อำเภอ *' + r);
    this.myForm.get('lcShippingCountry').setValue('ประเทศ' + r);
    this.myForm.get('lcShippingState').setValue('จังหวัด' + r);
    this.myForm.get('lcShippingZip').setValue('รหัสไปรษณีย์ *' + r);
    this.myForm.get('lcShippingPhone').setValue('โทรศัพท์ *' + r);
    this.myForm.get('lcShippingFax').setValue('แฟ็กซ์' + r);
    this.myForm.get('lcMerchantNotes').setValue('โน๊ตจากพ่อค้า' + r);
  }

  getByID(id) {
    console.clear();
    //alert(id);
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.dropshipModel = response;
      this.FormMode = 'put';
      response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);
      this.myForm.get('uxCreatorLabel').setValue(response.uxCreatorLabel);
      this.myForm.get('lcUserName').setValue(response.lcUserName);
      this.myForm.get('lcPassword').setValue(response.lcPassword);
      this.myForm.get('lcIsWholesale').setValue(response.lcIsWholesale);
      this.myForm
        .get('uxWholesaleLevelsLabel')
        .setValue(response.uxWholesaleLevelsLabel);
      this.myForm.get('lcRegisterDate').setValue(response.lcRegisterDate);
      this.myForm.get('lcIsEnabled').setValue(response.lcIsEnabled);
      this.myForm.get('lcFirstName').setValue(response.lcFirstName);
      this.myForm.get('lcLastName').setValue(response.lcLastName);
      this.myForm.get('lcCompany').setValue(response.lcCompany);
      this.myForm.get('lcAddress').setValue(response.lcAddress);
      this.myForm.get('uxDistrictLabel').setValue(response.uxDistrictLabel);
      this.myForm.get('lcCity').setValue(response.lcCity);
      this.myForm.get('lcCountry').setValue(response.lcCountry);
      this.myForm.get('lcState').setValue(response.lcState);
      this.myForm.get('lcZip').setValue(response.lcZip);
      this.myForm.get('lcPhone').setValue(response.lcPhone);
      this.myForm.get('lcEmail').setValue(response.lcEmail);
      this.myForm.get('uxLineIDLabel').setValue(response.uxLineIDLabel);
      this.myForm
        .get('uxUseBillingAsShippingLabel')
        .setValue(response.uxUseBillingAsShippingLabel);
      this.myForm
        .get('lcShippingFirstName')
        .setValue(response.lcShippingFirstName);
      this.myForm
        .get('lcShippingLastName')
        .setValue(response.lcShippingLastName);
      this.myForm.get('lcShippingCompany').setValue(response.lcShippingCompany);
      this.myForm.get('lcShippingAddress').setValue(response.lcShippingAddress);
      this.myForm
        .get('uxShippingDistrictLabel')
        .setValue(response.uxShippingDistrictLabel);
      this.myForm.get('lcShippingCity').setValue(response.lcShippingCity);
      this.myForm.get('lcShippingCountry').setValue(response.lcShippingCountry);
      this.myForm.get('lcShippingState').setValue(response.lcShippingState);
      this.myForm.get('lcShippingZip').setValue(response.lcShippingZip);
      this.myForm.get('lcShippingPhone').setValue(response.lcShippingPhone);
      this.myForm.get('lcShippingFax').setValue(response.lcShippingFax);
      this.myForm.get('lcMerchantNotes').setValue(response.lcMerchantNotes);

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

  saveDropship() {}

  searchDropship() {}

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

  dropship_Emit(e: any) {
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
