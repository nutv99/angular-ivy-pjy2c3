import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_designModel } from '../../_models/design';
import { full_designModel } from './designModel';
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
  selector: 'app-designForm',
  templateUrl: './designForm.component.html',
  styleUrls: ['./designForm.component.scss'],
})



export class DesignFormComponent implements OnInit {

  formCode : string = 'new' ;
  formModal: any;

  // Table Crud
  varmodelTable: modelTable = {
    formCode: 'new',
    apiTable: 'design',
	formNameEdit : 'designForm',
    Caption: 'design',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  designModel: full_designModel = {
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
  ModelName: string = 'design';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-design ';

  stageCrud: boolean = true;
  stageForm: boolean = true;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService,private _Activatedroute: ActivatedRoute) {}

  ngOnInit() {

	
this.myForm = this.fb.group({
id : ['',Validators.required],uxDisplayGoToTopLabel : ['',Validators.required],uxDisplayCallLabel : ['',Validators.required],uxDisplayLineLabel : ['',Validators.required],uxDisplayTaxInvoiceRequestLabel : ['',Validators.required],uxMiniCartModuleDisplay : ['',Validators.required],uxWishListDisplayLabel : ['',Validators.required],uxCurrencyModuleDisplayLabel : ['',Validators.required],uxDisplayCurrencyCodeLabel : ['',Validators.required],uxEnableNewArrivalProductLabel : ['',Validators.required],uxNewArrivalTypeLabel : ['',Validators.required],uxNewArrivalMultiRowProductLabel : ['',Validators.required],uxMaximumDisplayProductNewArrivalLabel : ['',Validators.required],uxBundlePromotionDisplay : ['',Validators.required],uxBundlePromotionModuleImage : ['',Validators.required],uxFeaturedProductModuleDisplayLabel : ['',Validators.required],uxBestsellersModuleDisplayLabel : ['',Validators.required],uxNewsModuleDisplayLabel : ['',Validators.required],uxHotDealDisplayLabel : ['',Validators.required],uxMaximumDisplayProductHotDealLabel : ['',Validators.required],uxBrandsCarouselLabel : ['',Validators.required],uxFacetedSearchEnabledLabel : ['',Validators.required],uxPriceNavigationStepLabel : ['',Validators.required],uxMaximunIntervalLabel : ['',Validators.required],uxCouponModuleDisplayLabel : ['',Validators.required],uxRecentlyViewedProductLabel : ['',Validators.required],uxEnableDepartmentLabel : ['',Validators.required],uxEnableManufacturerLabel : ['',Validators.required],uxSiteMapEnabledLabel : ['',Validators.required],uxSiteMapTypeLabel : ['',Validators.required],uxNewsletterModuleDisplayLabel : ['',Validators.required],uxPaymentLogoModuleDisplayLabel : ['',Validators.required],uxPaymentLogoModuleImageLabel : ['',Validators.required]});

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
this.myForm.get('uxDisplayGoToTopLabel').setValue('');
this.myForm.get('uxDisplayCallLabel').setValue('');
this.myForm.get('uxDisplayLineLabel').setValue('');
this.myForm.get('uxDisplayTaxInvoiceRequestLabel').setValue('');
this.myForm.get('uxMiniCartModuleDisplay').setValue('');
this.myForm.get('uxWishListDisplayLabel').setValue('');
this.myForm.get('uxCurrencyModuleDisplayLabel').setValue('');
this.myForm.get('uxDisplayCurrencyCodeLabel').setValue('');
this.myForm.get('uxEnableNewArrivalProductLabel').setValue('');
this.myForm.get('uxNewArrivalTypeLabel').setValue('');
this.myForm.get('uxNewArrivalMultiRowProductLabel').setValue('');
this.myForm.get('uxMaximumDisplayProductNewArrivalLabel').setValue('');
this.myForm.get('uxBundlePromotionDisplay').setValue('');
this.myForm.get('uxBundlePromotionModuleImage').setValue('');
this.myForm.get('uxFeaturedProductModuleDisplayLabel').setValue('');
this.myForm.get('uxBestsellersModuleDisplayLabel').setValue('');
this.myForm.get('uxNewsModuleDisplayLabel').setValue('');
this.myForm.get('uxHotDealDisplayLabel').setValue('');
this.myForm.get('uxMaximumDisplayProductHotDealLabel').setValue('');
this.myForm.get('uxBrandsCarouselLabel').setValue('');
this.myForm.get('uxFacetedSearchEnabledLabel').setValue('');
this.myForm.get('uxPriceNavigationStepLabel').setValue('');
this.myForm.get('uxMaximunIntervalLabel').setValue('');
this.myForm.get('uxCouponModuleDisplayLabel').setValue('');
this.myForm.get('uxRecentlyViewedProductLabel').setValue('');
this.myForm.get('uxEnableDepartmentLabel').setValue('');
this.myForm.get('uxEnableManufacturerLabel').setValue('');
this.myForm.get('uxSiteMapEnabledLabel').setValue('');
this.myForm.get('uxSiteMapTypeLabel').setValue('');
this.myForm.get('uxNewsletterModuleDisplayLabel').setValue('');
this.myForm.get('uxPaymentLogoModuleDisplayLabel').setValue('');
this.myForm.get('uxPaymentLogoModuleImageLabel').setValue('');


  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.designModel = response;
	  this.FormMode = 'put';
	  response = response.DataResult;
      console.log('res', response);

      this.myForm.get('id').setValue(response.id);this.myForm.get('uxDisplayGoToTopLabel').setValue(response.uxDisplayGoToTopLabel);this.myForm.get('uxDisplayCallLabel').setValue(response.uxDisplayCallLabel);this.myForm.get('uxDisplayLineLabel').setValue(response.uxDisplayLineLabel);this.myForm.get('uxDisplayTaxInvoiceRequestLabel').setValue(response.uxDisplayTaxInvoiceRequestLabel);this.myForm.get('uxMiniCartModuleDisplay').setValue(response.uxMiniCartModuleDisplay);this.myForm.get('uxWishListDisplayLabel').setValue(response.uxWishListDisplayLabel);this.myForm.get('uxCurrencyModuleDisplayLabel').setValue(response.uxCurrencyModuleDisplayLabel);this.myForm.get('uxDisplayCurrencyCodeLabel').setValue(response.uxDisplayCurrencyCodeLabel);this.myForm.get('uxEnableNewArrivalProductLabel').setValue(response.uxEnableNewArrivalProductLabel);this.myForm.get('uxNewArrivalTypeLabel').setValue(response.uxNewArrivalTypeLabel);this.myForm.get('uxNewArrivalMultiRowProductLabel').setValue(response.uxNewArrivalMultiRowProductLabel);this.myForm.get('uxMaximumDisplayProductNewArrivalLabel').setValue(response.uxMaximumDisplayProductNewArrivalLabel);this.myForm.get('uxBundlePromotionDisplay').setValue(response.uxBundlePromotionDisplay);this.myForm.get('uxBundlePromotionModuleImage').setValue(response.uxBundlePromotionModuleImage);this.myForm.get('uxFeaturedProductModuleDisplayLabel').setValue(response.uxFeaturedProductModuleDisplayLabel);this.myForm.get('uxBestsellersModuleDisplayLabel').setValue(response.uxBestsellersModuleDisplayLabel);this.myForm.get('uxNewsModuleDisplayLabel').setValue(response.uxNewsModuleDisplayLabel);this.myForm.get('uxHotDealDisplayLabel').setValue(response.uxHotDealDisplayLabel);this.myForm.get('uxMaximumDisplayProductHotDealLabel').setValue(response.uxMaximumDisplayProductHotDealLabel);this.myForm.get('uxBrandsCarouselLabel').setValue(response.uxBrandsCarouselLabel);this.myForm.get('uxFacetedSearchEnabledLabel').setValue(response.uxFacetedSearchEnabledLabel);this.myForm.get('uxPriceNavigationStepLabel').setValue(response.uxPriceNavigationStepLabel);this.myForm.get('uxMaximunIntervalLabel').setValue(response.uxMaximunIntervalLabel);this.myForm.get('uxCouponModuleDisplayLabel').setValue(response.uxCouponModuleDisplayLabel);this.myForm.get('uxRecentlyViewedProductLabel').setValue(response.uxRecentlyViewedProductLabel);this.myForm.get('uxEnableDepartmentLabel').setValue(response.uxEnableDepartmentLabel);this.myForm.get('uxEnableManufacturerLabel').setValue(response.uxEnableManufacturerLabel);this.myForm.get('uxSiteMapEnabledLabel').setValue(response.uxSiteMapEnabledLabel);this.myForm.get('uxSiteMapTypeLabel').setValue(response.uxSiteMapTypeLabel);this.myForm.get('uxNewsletterModuleDisplayLabel').setValue(response.uxNewsletterModuleDisplayLabel);this.myForm.get('uxPaymentLogoModuleDisplayLabel').setValue(response.uxPaymentLogoModuleDisplayLabel);this.myForm.get('uxPaymentLogoModuleImageLabel').setValue(response.uxPaymentLogoModuleImageLabel);


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

  saveDesign() {}

  searchDesign() {}

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

  design_Emit(e:any) {
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
