import { Component, OnInit,Pipe } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { Tabledata2Component } from '../../shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from '../../shared/components/searchselect/searchselect.component';

//import { full_companyoptionModel } from '../../_models/companyoption';
import { full_companyoptionModel } from './companyoption';
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
  selector: 'app-companyoption',
  templateUrl: './companyoption.component.html',
  styleUrls: ['./companyoption.component.css'],
})
export class CompanyoptionComponent implements OnInit {
  formModal: any;
  varmodelTable: modelTable = {
    apiTable: 'companyoption',
    Caption: 'ตั้งรายละเอียดร้านค้า',
    headerColTable: ['', '', '', ''],
    ParentTableList: [],
  };
  // Initial Form Model VAR & Value
  companyoptionModel: full_companyoptionModel = {
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
  ModelName: string = 'companyoption';
  FormMode: string = 'post';
  formTitle: string = 'เพิ่มข้อมูล-ตั้งรายละเอียดร้านค้า ';
  aaa: any = -1;

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
      uxDefaultWebsiteLanguageLabel: [''],
      countryID: [''],
      uxRestrictAccessToShopLabel: [''],
      uxPriceRequireLoginLabel: [''],
      uxEnableMaintenanceWebsiteLabel: [''],
      uxMaintenanceTitleLabel: [''],
      uxMaintenanceTextLabel: [''],
      uxBackgroudTitle: [''],
      uxEnableFacebookLoginLabel: [''],
      uxFacebookAPIKeyLabel: [''],
      uxFacebookAppSecretLabel: [''],
      uxEnableFacebookLoginEnforceHTTPSLabel: [''],
      uxEnableLineLoginLabel: [''],
      uxCustomerAutoApproveLabel: [''],
      uxEmailNewRegistrationLabel: [''],
      uxUseInventoryControlLabel: [''],
      uxDisplayRemainingQuantityLabel: [''],
      uxOutOfStockValueLabel: [''],
      uxWeightUnitLabel: [''],
      uxHeightUnitLabel: [''],
      uxSetDefaultCurrencyLabel: [''],
      uxAllowAnonymousCheckoutLabel: [''],
      uxShippingAddressModeLabel: [''],
      lcPolicyAgreementEnabled: [''],
      uxCheckoutModeLabel: [''],
      uxMerchantShipCountryLabel: [''],
      uxShippingIncludeDiscountLabel: [''],
      uxShippingEstimateLabel: [''],
      uxShippingTrackingLabel: [''],
      uxShippingTrackingTextLabel: [''],
      uxHandlingFeeLabel: [''],
      uxQuantityDiscountOptionLabel: [''],
      uxGatewayDiscountAfterDiscountLabel: [''],
      uxProductItemPerPageLabel: [''],
      uxCategoryItemPerPageLabel: [''],
      uxDepartmentItemPerPageLabel: [''],
      uxManufacturerItemPerPageLabel: [''],
      uxBundlePromotionItemPerPageLabel: [''],
      uxRandomItemLabel: [''],
      uxBestSellingItemLabel: [''],
      uxProductNewArrivalItemLabel: [''],
      uxBundlePromotionShowLabel: [''],
      uxCompareProductItemLabel: [''],
      uxRecentlyViewedItemLabel: [''],
      uxDBDSourceCodeLabel: [''],
      uxObtainConsentCookiesLabel: [''],
      uxCookieConsentTextLabel: [''],
      uxCookiePolicyBtnTextLabel: [''],
      uxCookiePolicyLinkLabel: [''],
      uxCookiePolicyAcceptLabel: [''],
      uxCookiePolicyTextLabel: [''],
      uxFacebookCommerceUrlLabel: [''],
      uxSearchModuleDisplayLabel: [''],
      uxDisplayCategoryInQuickSearchLabel: [''],
      uxSearchModeLabel: [''],
      uxAdvancedSearchModeLabel: [''],
      uxStartOrderNoSetupLabel: [''],
      uxOrderMaximumEnabledLabel: [''],
      uxOrderMinimumEnabledLabel: [''],
      uxAdsPopupConfigurationTitle: [''],
    });

    if (this._Activatedroute.snapshot.paramMap.get('id')) {
      //alert(this._Activatedroute.snapshot.paramMap.get('id'));
      let id = this._Activatedroute.snapshot.paramMap.get('id');
      // this.myForm.get('id').setValue(id);
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

    this.myForm.get('uxDefaultWebsiteLanguageLabel').setValue('');
    this.myForm.get('countryID').setValue('');
    this.myForm.get('uxRestrictAccessToShopLabel').setValue('');
    this.myForm.get('uxPriceRequireLoginLabel').setValue('');
    this.myForm.get('uxEnableMaintenanceWebsiteLabel').setValue('');
    this.myForm.get('uxMaintenanceTitleLabel').setValue('');
    this.myForm.get('uxMaintenanceTextLabel').setValue('');
    this.myForm.get('uxBackgroudTitle').setValue('');
    this.myForm.get('uxEnableFacebookLoginLabel').setValue('');
    this.myForm.get('uxFacebookAPIKeyLabel').setValue('');
    this.myForm.get('uxFacebookAppSecretLabel').setValue('');
    this.myForm.get('uxEnableFacebookLoginEnforceHTTPSLabel').setValue('');
    this.myForm.get('uxEnableLineLoginLabel').setValue('');
    this.myForm.get('uxCustomerAutoApproveLabel').setValue('');
    this.myForm.get('uxEmailNewRegistrationLabel').setValue('');
    this.myForm.get('uxUseInventoryControlLabel').setValue('');
    this.myForm.get('uxDisplayRemainingQuantityLabel').setValue('');
    this.myForm.get('uxOutOfStockValueLabel').setValue('');
    this.myForm.get('uxWeightUnitLabel').setValue('');
    this.myForm.get('uxHeightUnitLabel').setValue('');
    this.myForm.get('uxSetDefaultCurrencyLabel').setValue('');
    this.myForm.get('uxAllowAnonymousCheckoutLabel').setValue('');
    this.myForm.get('uxShippingAddressModeLabel').setValue('');
    this.myForm.get('lcPolicyAgreementEnabled').setValue('');
    this.myForm.get('uxCheckoutModeLabel').setValue('');
    this.myForm.get('uxMerchantShipCountryLabel').setValue('');
    this.myForm.get('uxShippingIncludeDiscountLabel').setValue('');
    this.myForm.get('uxShippingEstimateLabel').setValue('');
    this.myForm.get('uxShippingTrackingLabel').setValue('');
    this.myForm.get('uxShippingTrackingTextLabel').setValue('');
    this.myForm.get('uxHandlingFeeLabel').setValue('');
    this.myForm.get('uxQuantityDiscountOptionLabel').setValue('');
    this.myForm.get('uxGatewayDiscountAfterDiscountLabel').setValue('');
    this.myForm.get('uxProductItemPerPageLabel').setValue('');
    this.myForm.get('uxCategoryItemPerPageLabel').setValue('');
    this.myForm.get('uxDepartmentItemPerPageLabel').setValue('');
    this.myForm.get('uxManufacturerItemPerPageLabel').setValue('');
    this.myForm.get('uxBundlePromotionItemPerPageLabel').setValue('');
    this.myForm.get('uxRandomItemLabel').setValue('');
    this.myForm.get('uxBestSellingItemLabel').setValue('');
    this.myForm.get('uxProductNewArrivalItemLabel').setValue('');
    this.myForm.get('uxBundlePromotionShowLabel').setValue('');
    this.myForm.get('uxCompareProductItemLabel').setValue('');
    this.myForm.get('uxRecentlyViewedItemLabel').setValue('');
    this.myForm.get('uxDBDSourceCodeLabel').setValue('');
    this.myForm.get('uxObtainConsentCookiesLabel').setValue('');
    this.myForm.get('uxCookieConsentTextLabel').setValue('');
    this.myForm.get('uxCookiePolicyBtnTextLabel').setValue('');
    this.myForm.get('uxCookiePolicyLinkLabel').setValue('');
    this.myForm.get('uxCookiePolicyAcceptLabel').setValue('');
    this.myForm.get('uxCookiePolicyTextLabel').setValue('');
    this.myForm.get('uxFacebookCommerceUrlLabel').setValue('');
    this.myForm.get('uxSearchModuleDisplayLabel').setValue('');
    this.myForm.get('uxDisplayCategoryInQuickSearchLabel').setValue('');
    this.myForm.get('uxSearchModeLabel').setValue('');
    this.myForm.get('uxAdvancedSearchModeLabel').setValue('');
    this.myForm.get('uxStartOrderNoSetupLabel').setValue('');
    this.myForm.get('uxOrderMaximumEnabledLabel').setValue('');
    this.myForm.get('uxOrderMinimumEnabledLabel').setValue('');
    this.myForm.get('uxAdsPopupConfigurationTitle').setValue('');
  }

  getByID(id) {
    console.clear();
    this.apiService.getById(this.ModelName, id).subscribe((response: any) => {
      //this.companyoptionModel = response;
      console.log('res', response.DataResult);
      response = response.DataResult[0];
      response = response[0];
      this.aaa = response.uxDefaultWebsiteLanguageLabel;
      this.myForm
        .get('uxDefaultWebsiteLanguageLabel')
        .setValue(response.uxDefaultWebsiteLanguageLabel);
      this.myForm.get('countryID').setValue(response.countryID);
      this.myForm
        .get('uxRestrictAccessToShopLabel')
        .setValue(response.uxRestrictAccessToShopLabel);
      this.myForm
        .get('uxPriceRequireLoginLabel')
        .setValue(response.uxPriceRequireLoginLabel);
      this.myForm
        .get('uxEnableMaintenanceWebsiteLabel')
        .setValue(response.uxEnableMaintenanceWebsiteLabel);
      this.myForm
        .get('uxMaintenanceTitleLabel')
        .setValue(response.uxMaintenanceTitleLabel);
      this.myForm
        .get('uxMaintenanceTextLabel')
        .setValue(response.uxMaintenanceTextLabel);
      this.myForm.get('uxBackgroudTitle').setValue(response.uxBackgroudTitle);
      this.myForm
        .get('uxEnableFacebookLoginLabel')
        .setValue(response.uxEnableFacebookLoginLabel);
      this.myForm
        .get('uxFacebookAPIKeyLabel')
        .setValue(response.uxFacebookAPIKeyLabel);
      this.myForm
        .get('uxFacebookAppSecretLabel')
        .setValue(response.uxFacebookAppSecretLabel);
      this.myForm
        .get('uxEnableFacebookLoginEnforceHTTPSLabel')
        .setValue(response.uxEnableFacebookLoginEnforceHTTPSLabel);
      this.myForm
        .get('uxEnableLineLoginLabel')
        .setValue(response.uxEnableLineLoginLabel);
      this.myForm
        .get('uxCustomerAutoApproveLabel')
        .setValue(response.uxCustomerAutoApproveLabel);
      this.myForm
        .get('uxEmailNewRegistrationLabel')
        .setValue(response.uxEmailNewRegistrationLabel);
      this.myForm
        .get('uxUseInventoryControlLabel')
        .setValue(response.uxUseInventoryControlLabel);
      this.myForm
        .get('uxDisplayRemainingQuantityLabel')
        .setValue(response.uxDisplayRemainingQuantityLabel);
      this.myForm
        .get('uxOutOfStockValueLabel')
        .setValue(response.uxOutOfStockValueLabel);
      this.myForm.get('uxWeightUnitLabel').setValue(response.uxWeightUnitLabel);
      this.myForm.get('uxHeightUnitLabel').setValue(response.uxHeightUnitLabel);
      this.myForm
        .get('uxSetDefaultCurrencyLabel')
        .setValue(response.uxSetDefaultCurrencyLabel);
      this.myForm
        .get('uxAllowAnonymousCheckoutLabel')
        .setValue(response.uxAllowAnonymousCheckoutLabel);
      this.myForm
        .get('uxShippingAddressModeLabel')
        .setValue(response.uxShippingAddressModeLabel);
      this.myForm
        .get('lcPolicyAgreementEnabled')
        .setValue(response.lcPolicyAgreementEnabled);
      this.myForm
        .get('uxCheckoutModeLabel')
        .setValue(response.uxCheckoutModeLabel);
      this.myForm
        .get('uxMerchantShipCountryLabel')
        .setValue(response.uxMerchantShipCountryLabel);
      this.myForm
        .get('uxShippingIncludeDiscountLabel')
        .setValue(response.uxShippingIncludeDiscountLabel);
      this.myForm
        .get('uxShippingEstimateLabel')
        .setValue(response.uxShippingEstimateLabel);
      this.myForm
        .get('uxShippingTrackingLabel')
        .setValue(response.uxShippingTrackingLabel);
      this.myForm
        .get('uxShippingTrackingTextLabel')
        .setValue(response.uxShippingTrackingTextLabel);
      this.myForm
        .get('uxHandlingFeeLabel')
        .setValue(response.uxHandlingFeeLabel);
      this.myForm
        .get('uxQuantityDiscountOptionLabel')
        .setValue(response.uxQuantityDiscountOptionLabel);
      this.myForm
        .get('uxGatewayDiscountAfterDiscountLabel')
        .setValue(response.uxGatewayDiscountAfterDiscountLabel);
      this.myForm
        .get('uxProductItemPerPageLabel')
        .setValue(response.uxProductItemPerPageLabel);
      this.myForm
        .get('uxCategoryItemPerPageLabel')
        .setValue(response.uxCategoryItemPerPageLabel);
      this.myForm
        .get('uxDepartmentItemPerPageLabel')
        .setValue(response.uxDepartmentItemPerPageLabel);
      this.myForm
        .get('uxManufacturerItemPerPageLabel')
        .setValue(response.uxManufacturerItemPerPageLabel);
      this.myForm
        .get('uxBundlePromotionItemPerPageLabel')
        .setValue(response.uxBundlePromotionItemPerPageLabel);
      this.myForm.get('uxRandomItemLabel').setValue(response.uxRandomItemLabel);
      this.myForm
        .get('uxBestSellingItemLabel')
        .setValue(response.uxBestSellingItemLabel);
      this.myForm
        .get('uxProductNewArrivalItemLabel')
        .setValue(response.uxProductNewArrivalItemLabel);
      this.myForm
        .get('uxBundlePromotionShowLabel')
        .setValue(response.uxBundlePromotionShowLabel);
      this.myForm
        .get('uxCompareProductItemLabel')
        .setValue(response.uxCompareProductItemLabel);
      this.myForm
        .get('uxRecentlyViewedItemLabel')
        .setValue(response.uxRecentlyViewedItemLabel);
      this.myForm
        .get('uxDBDSourceCodeLabel')
        .setValue(response.uxDBDSourceCodeLabel);
      this.myForm
        .get('uxObtainConsentCookiesLabel')
        .setValue(response.uxObtainConsentCookiesLabel);
      this.myForm
        .get('uxCookieConsentTextLabel')
        .setValue(response.uxCookieConsentTextLabel);
      this.myForm
        .get('uxCookiePolicyBtnTextLabel')
        .setValue(response.uxCookiePolicyBtnTextLabel);
      this.myForm
        .get('uxCookiePolicyLinkLabel')
        .setValue(response.uxCookiePolicyLinkLabel);
      this.myForm
        .get('uxCookiePolicyAcceptLabel')
        .setValue(response.uxCookiePolicyAcceptLabel);
      this.myForm
        .get('uxCookiePolicyTextLabel')
        .setValue(response.uxCookiePolicyTextLabel);
      this.myForm
        .get('uxFacebookCommerceUrlLabel')
        .setValue(response.uxFacebookCommerceUrlLabel);
      this.myForm
        .get('uxSearchModuleDisplayLabel')
        .setValue(response.uxSearchModuleDisplayLabel);
      this.myForm
        .get('uxDisplayCategoryInQuickSearchLabel')
        .setValue(response.uxDisplayCategoryInQuickSearchLabel);
      this.myForm.get('uxSearchModeLabel').setValue(response.uxSearchModeLabel);
      this.myForm
        .get('uxAdvancedSearchModeLabel')
        .setValue(response.uxAdvancedSearchModeLabel);
      this.myForm
        .get('uxStartOrderNoSetupLabel')
        .setValue(response.uxStartOrderNoSetupLabel);
      this.myForm
        .get('uxOrderMaximumEnabledLabel')
        .setValue(response.uxOrderMaximumEnabledLabel);
      this.myForm
        .get('uxOrderMinimumEnabledLabel')
        .setValue(response.uxOrderMinimumEnabledLabel);
      this.myForm
        .get('uxAdsPopupConfigurationTitle')
        .setValue(response.uxAdsPopupConfigurationTitle);

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

  saveCompanyoption() {}

  searchCompanyoption() {}

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

  companyoption_Emit(e: any) {
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

  setChanges() {
    this.aaa = 1;
    this.myForm
        .get('uxDefaultWebsiteLanguageLabel')
        .setValue(this.aaa);
    console.log('hange Occur');
  }

  // openFormModal() {
  //   this.formModal.show();
  // }
  // saveSomeThing() {
  //   // confirm or save something
  //   this.formModal.hide();
  // }
}
