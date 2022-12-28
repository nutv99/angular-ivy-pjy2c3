import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import {
  NgbDatepickerConfig,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoutselectComponent } from '../shared/component2/boutselect/boutselect.component';
import { OutSelectSearchlocalComponent } from '../shared/component2/out-select-searchlocal/out-select-searchlocal.component';

import { FileUploadComponent } from '../shared/component2/file-upload/file-upload.component';
import { UploadImagesComponent } from '../shared/components/upload-images/upload-images.component';


import { RouterModule, Routes } from '@angular/router';

import { Tabledata3Component } from '../shared/components/tabledata3/tabledata3.component';

import { PagetestComponent } from '../pages/pagetest/pagetest.component';
import { CompanyOptionComponent } from '../pages/company-option/company-option.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CompanyoptionComponent } from '../pages/companyoption/companyoption.component';
import { CompanyoptionListComponent } from '../pages/companyoption/companyoptionList.component';

import { CompanyComponent } from '../pages/company/company.component';
import { PaymentchannelComponent } from '../pages/paymentchannel/paymentchannel.component';
import { PaymentchannelListComponent } from '../pages/paymentchannel/paymentchannelList.component';
import { DepartmentFormComponent } from '../pages/departmentForm/departmentForm.component';
import { DepartmentListComponent } from '../pages/departmentForm/departmentList.component';

import { ItemmasterFormComponent } from'../pages/itemmasterForm/itemmasterForm.component';
import { ItemmasterListComponent } from '../pages/itemmasterForm/itemmasterList.component';

import { BannerSlideFormComponent } from'../pages/bannerSlide/bannerSlideForm.component';
import { BannerSlideListComponent } from '../pages/bannerSlide/bannerSlideList.component';
import { DesignFormComponent } from'../pages/design/designForm.component';
import { DesignListComponent } from '../pages/design/designList.component';
import { AdsFormComponent } from'../pages/Ads/AdsForm.component';
import { AdsListComponent } from '../pages/Ads/AdsList.component';



import { CustomerFormComponent } from'../pages/customer/customerForm.component';
import { CustomerListComponent } from '../pages/customer/customerList.component';

import {List99Component} from '../pages/list99/list99.component';
import { AffilFormComponent } from'../pages/affil/affilForm.component';
import { AffilListComponent } from '../pages/affil/affilList.component';

import { DropshipFormComponent } from'../pages/dropship/dropshipForm.component';
import { DropshipListComponent } from '../pages/dropship/dropshipList.component';

import { CouponFormComponent } from'../pages/coupon/couponForm.component';
import { CouponListComponent } from '../pages/coupon/couponList.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    BoutselectComponent,
    OutSelectSearchlocalComponent,
    Tabledata3Component,
    FileUploadComponent,
    UploadImagesComponent,

    PagetestComponent,
    CompanyOptionComponent,
    CompanyoptionComponent,
    CompanyoptionListComponent,
    CompanyComponent,
    PaymentchannelComponent,
    PaymentchannelListComponent,
    DepartmentFormComponent,
    DepartmentListComponent,
    ItemmasterFormComponent,ItemmasterListComponent
    ,BannerSlideFormComponent,BannerSlideListComponent
    ,DesignFormComponent,DesignListComponent
    ,AdsFormComponent,AdsListComponent
    
    ,CustomerFormComponent,CustomerListComponent,
    List99Component,AffilFormComponent,AffilListComponent
    ,DropshipFormComponent,DropshipListComponent,CouponFormComponent,CouponListComponent
   
  ],
  exports: [
    PagetestComponent,
    CompanyOptionComponent,
    CompanyoptionComponent,
    UploadImagesComponent,
    CompanyoptionListComponent,
    DepartmentFormComponent,
    DepartmentListComponent,
    ItemmasterFormComponent,ItemmasterListComponent
    ,BannerSlideFormComponent,BannerSlideListComponent
    ,DesignFormComponent,DesignListComponent
    ,AdsFormComponent,AdsListComponent
    ,CustomerFormComponent,CustomerListComponent,
    List99Component,
    AffilFormComponent,AffilListComponent,
    DropshipFormComponent,DropshipListComponent,CouponFormComponent,CouponListComponent
    
  ],
})
export class PagemoduleModule {}
