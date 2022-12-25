import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_companyModel } from '../../_models/company';
import { full_companyModel } from './company';
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
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})



export class CompanyComponent implements OnInit {
  formModal: any;
  varmodelTable: modelTable = {
    apiTable: 'company',
    Caption: 'ตั้งค่าร้านค้าเบื้องต้น',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  companyModel: full_companyModel = {
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
  ModelName: string = 'company';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-ตั้งค่าร้านค้าเบื้องต้น ';

  stageCrud: boolean = true;
  stageForm: boolean = true;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService,private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {

	
this.myForm = this.fb.group({
id : ['',Validators.required],lcBusinessName : ['',Validators.required],lcBusinessAddress : ['',Validators.required],lcBusinessCity : ['',Validators.required],lcBusinessState : ['',Validators.required],lcBusinessZip : ['',Validators.required],lcBusinessCountry : ['',Validators.required],uxBusinessPhoneNoteLabel : ['',Validators.required],lcBusinessFax : ['',Validators.required],lcBusinessEmail : ['',Validators.required],uxEnableMapLabel : ['',Validators.required],uxGoogleMapTypeLabel : ['',Validators.required],uxGoogleMapAPIKeyLabel : ['',Validators.required],uxLatitudeLabel : ['',Validators.required],uxLongitudeLabel : ['',Validators.required],uxEmailProviderLabel : ['',Validators.required],lcSmtpServer : ['',Validators.required],lcSmtpPort : ['',Validators.required],lcSmtpAuthenRequired : ['',Validators.required],uxRequireEmailSslLabel : ['',Validators.required],uxEnableFacebookPageLabel : ['',Validators.required],uxFacebookPageURLLabel : ['',Validators.required],uxLineEnabledLabel : ['',Validators.required],uxLineAccountLabel : ['',Validators.required],uxTwitterEnabledLabel : ['',Validators.required],uxTwitterUrlLabel : ['',Validators.required],uxInstagramEnabledLabel : ['',Validators.required],uxInstagramUrlLabel : ['',Validators.required],uxYoutubeEnabledLabel : ['',Validators.required],uxYoutubeUrlLabel : ['',Validators.required],uxFaceBookLikeButtonLabel : ['',Validators.required],uxLineItLabel : ['',Validators.required],uxTwitterTweetLabel : ['',Validators.required],uxZopimEnabledLabel : ['',Validators.required],uxFacebookMessengerEnabledLabel : ['',Validators.required],uxFacebookMessengerInfoLabel : ['',Validators.required],uxFacebookMessengerLabel : ['',Validators.required],uxFacebookCustomerLabel : ['',Validators.required],uxFacebookCustomerFanpageID : ['',Validators.required],uxFacebookCustomerAppID : ['',Validators.required],uxFacebookCustomerWelcomeNoteText : ['',Validators.required],uxOldPasswordLabel : ['',Validators.required],uxNewPasswordLabel : ['',Validators.required]});

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
this.myForm.get('lcBusinessName').setValue('');
this.myForm.get('lcBusinessAddress').setValue('');
this.myForm.get('lcBusinessCity').setValue('');
this.myForm.get('lcBusinessState').setValue('');
this.myForm.get('lcBusinessZip').setValue('');
this.myForm.get('lcBusinessCountry').setValue('');
this.myForm.get('uxBusinessPhoneNoteLabel').setValue('');
this.myForm.get('lcBusinessFax').setValue('');
this.myForm.get('lcBusinessEmail').setValue('');
this.myForm.get('uxEnableMapLabel').setValue('');
this.myForm.get('uxGoogleMapTypeLabel').setValue('');
this.myForm.get('uxGoogleMapAPIKeyLabel').setValue('');
this.myForm.get('uxLatitudeLabel').setValue('');
this.myForm.get('uxLongitudeLabel').setValue('');
this.myForm.get('uxEmailProviderLabel').setValue('');
this.myForm.get('lcSmtpServer').setValue('');
this.myForm.get('lcSmtpPort').setValue('');
this.myForm.get('lcSmtpAuthenRequired').setValue('');
this.myForm.get('uxRequireEmailSslLabel').setValue('');
this.myForm.get('uxEnableFacebookPageLabel').setValue('');
this.myForm.get('uxFacebookPageURLLabel').setValue('');
this.myForm.get('uxLineEnabledLabel').setValue('');
this.myForm.get('uxLineAccountLabel').setValue('');
this.myForm.get('uxTwitterEnabledLabel').setValue('');
this.myForm.get('uxTwitterUrlLabel').setValue('');
this.myForm.get('uxInstagramEnabledLabel').setValue('');
this.myForm.get('uxInstagramUrlLabel').setValue('');
this.myForm.get('uxYoutubeEnabledLabel').setValue('');
this.myForm.get('uxYoutubeUrlLabel').setValue('');
this.myForm.get('uxFaceBookLikeButtonLabel').setValue('');
this.myForm.get('uxLineItLabel').setValue('');
this.myForm.get('uxTwitterTweetLabel').setValue('');
this.myForm.get('uxZopimEnabledLabel').setValue('');
this.myForm.get('uxFacebookMessengerEnabledLabel').setValue('');
this.myForm.get('uxFacebookMessengerInfoLabel').setValue('');
this.myForm.get('uxFacebookMessengerLabel').setValue('');
this.myForm.get('uxFacebookCustomerLabel').setValue('');
this.myForm.get('uxFacebookCustomerFanpageID').setValue('');
this.myForm.get('uxFacebookCustomerAppID').setValue('');
this.myForm.get('uxFacebookCustomerWelcomeNoteText').setValue('');
this.myForm.get('uxOldPasswordLabel').setValue('');
this.myForm.get('uxNewPasswordLabel').setValue('');


  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.companyModel = response;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);this.myForm.get('lcBusinessName').setValue(response.lcBusinessName);this.myForm.get('lcBusinessAddress').setValue(response.lcBusinessAddress);this.myForm.get('lcBusinessCity').setValue(response.lcBusinessCity);this.myForm.get('lcBusinessState').setValue(response.lcBusinessState);this.myForm.get('lcBusinessZip').setValue(response.lcBusinessZip);this.myForm.get('lcBusinessCountry').setValue(response.lcBusinessCountry);this.myForm.get('uxBusinessPhoneNoteLabel').setValue(response.uxBusinessPhoneNoteLabel);this.myForm.get('lcBusinessFax').setValue(response.lcBusinessFax);this.myForm.get('lcBusinessEmail').setValue(response.lcBusinessEmail);this.myForm.get('uxEnableMapLabel').setValue(response.uxEnableMapLabel);this.myForm.get('uxGoogleMapTypeLabel').setValue(response.uxGoogleMapTypeLabel);this.myForm.get('uxGoogleMapAPIKeyLabel').setValue(response.uxGoogleMapAPIKeyLabel);this.myForm.get('uxLatitudeLabel').setValue(response.uxLatitudeLabel);this.myForm.get('uxLongitudeLabel').setValue(response.uxLongitudeLabel);this.myForm.get('uxEmailProviderLabel').setValue(response.uxEmailProviderLabel);this.myForm.get('lcSmtpServer').setValue(response.lcSmtpServer);this.myForm.get('lcSmtpPort').setValue(response.lcSmtpPort);this.myForm.get('lcSmtpAuthenRequired').setValue(response.lcSmtpAuthenRequired);this.myForm.get('uxRequireEmailSslLabel').setValue(response.uxRequireEmailSslLabel);this.myForm.get('uxEnableFacebookPageLabel').setValue(response.uxEnableFacebookPageLabel);this.myForm.get('uxFacebookPageURLLabel').setValue(response.uxFacebookPageURLLabel);this.myForm.get('uxLineEnabledLabel').setValue(response.uxLineEnabledLabel);this.myForm.get('uxLineAccountLabel').setValue(response.uxLineAccountLabel);this.myForm.get('uxTwitterEnabledLabel').setValue(response.uxTwitterEnabledLabel);this.myForm.get('uxTwitterUrlLabel').setValue(response.uxTwitterUrlLabel);this.myForm.get('uxInstagramEnabledLabel').setValue(response.uxInstagramEnabledLabel);this.myForm.get('uxInstagramUrlLabel').setValue(response.uxInstagramUrlLabel);this.myForm.get('uxYoutubeEnabledLabel').setValue(response.uxYoutubeEnabledLabel);this.myForm.get('uxYoutubeUrlLabel').setValue(response.uxYoutubeUrlLabel);this.myForm.get('uxFaceBookLikeButtonLabel').setValue(response.uxFaceBookLikeButtonLabel);this.myForm.get('uxLineItLabel').setValue(response.uxLineItLabel);this.myForm.get('uxTwitterTweetLabel').setValue(response.uxTwitterTweetLabel);this.myForm.get('uxZopimEnabledLabel').setValue(response.uxZopimEnabledLabel);this.myForm.get('uxFacebookMessengerEnabledLabel').setValue(response.uxFacebookMessengerEnabledLabel);this.myForm.get('uxFacebookMessengerInfoLabel').setValue(response.uxFacebookMessengerInfoLabel);this.myForm.get('uxFacebookMessengerLabel').setValue(response.uxFacebookMessengerLabel);this.myForm.get('uxFacebookCustomerLabel').setValue(response.uxFacebookCustomerLabel);this.myForm.get('uxFacebookCustomerFanpageID').setValue(response.uxFacebookCustomerFanpageID);this.myForm.get('uxFacebookCustomerAppID').setValue(response.uxFacebookCustomerAppID);this.myForm.get('uxFacebookCustomerWelcomeNoteText').setValue(response.uxFacebookCustomerWelcomeNoteText);this.myForm.get('uxOldPasswordLabel').setValue(response.uxOldPasswordLabel);this.myForm.get('uxNewPasswordLabel').setValue(response.uxNewPasswordLabel);


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

  saveCompany() {}

  searchCompany() {}

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

  company_Emit(e:any) {
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
