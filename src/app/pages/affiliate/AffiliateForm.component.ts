import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_AffiliateModel } from '../../_models/Affiliate';
import { full_AffiliateModel } from './AffiliateModel';
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
  selector: 'app-AffiliateForm',
  templateUrl: './AffiliateForm.component.html',
  styleUrls: ['./AffiliateForm.component.scss'],
})



export class AffiliateFormComponent implements OnInit {

  formCode : string = 'new' ;
  formModal: any;

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'new',
    apiTable: 'Affiliate',
	formNameEdit : 'AffiliateForm',
    Caption: 'Affiliate',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  AffiliateModel: full_AffiliateModel = {
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
  ModelName: string = 'Affiliate';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-Affiliate ';

  stageCrud: boolean = true;
  stageForm: boolean = true;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService,private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {

	
this.myForm = this.fb.group({
id : ['',Validators.required],lcUserName : ['',Validators.required],lcPassword : ['',Validators.required],lcConfirm : ['',Validators.required],lcRegisterDate : ['',Validators.required],lcIsEnabled : ['',Validators.required],lcFirstName : ['',Validators.required],lcLastName : ['',Validators.required],lcWebSite : ['',Validators.required],lcCompany : ['',Validators.required],lcAddress : ['',Validators.required],lcDistrict : ['',Validators.required],lcCity : ['',Validators.required],lcCountry : ['',Validators.required],lcState : ['',Validators.required],lcZip : ['',Validators.required],lcPhone : ['',Validators.required],lcEmail : ['',Validators.required],lcCommission : ['',Validators.required]});

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
this.myForm.get('lcUserName').setValue('');
this.myForm.get('lcPassword').setValue('');
this.myForm.get('lcConfirm').setValue('');
this.myForm.get('lcRegisterDate').setValue('');
this.myForm.get('lcIsEnabled').setValue('');
this.myForm.get('lcFirstName').setValue('');
this.myForm.get('lcLastName').setValue('');
this.myForm.get('lcWebSite').setValue('');
this.myForm.get('lcCompany').setValue('');
this.myForm.get('lcAddress').setValue('');
this.myForm.get('lcDistrict').setValue('');
this.myForm.get('lcCity').setValue('');
this.myForm.get('lcCountry').setValue('');
this.myForm.get('lcState').setValue('');
this.myForm.get('lcZip').setValue('');
this.myForm.get('lcPhone').setValue('');
this.myForm.get('lcEmail').setValue('');
this.myForm.get('lcCommission').setValue('');


  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.AffiliateModel = response;
	  this.FormMode = 'put';
	  response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);this.myForm.get('lcUserName').setValue(response.lcUserName);this.myForm.get('lcPassword').setValue(response.lcPassword);this.myForm.get('lcConfirm').setValue(response.lcConfirm);this.myForm.get('lcRegisterDate').setValue(response.lcRegisterDate);this.myForm.get('lcIsEnabled').setValue(response.lcIsEnabled);this.myForm.get('lcFirstName').setValue(response.lcFirstName);this.myForm.get('lcLastName').setValue(response.lcLastName);this.myForm.get('lcWebSite').setValue(response.lcWebSite);this.myForm.get('lcCompany').setValue(response.lcCompany);this.myForm.get('lcAddress').setValue(response.lcAddress);this.myForm.get('lcDistrict').setValue(response.lcDistrict);this.myForm.get('lcCity').setValue(response.lcCity);this.myForm.get('lcCountry').setValue(response.lcCountry);this.myForm.get('lcState').setValue(response.lcState);this.myForm.get('lcZip').setValue(response.lcZip);this.myForm.get('lcPhone').setValue(response.lcPhone);this.myForm.get('lcEmail').setValue(response.lcEmail);this.myForm.get('lcCommission').setValue(response.lcCommission);


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

  saveAffiliate() {}

  searchAffiliate() {}

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

  Affiliate_Emit(e:any) {
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
