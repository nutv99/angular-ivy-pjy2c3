import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoutselectComponent } from '../shared/component2/boutselect/boutselect.component';
import { OutSelectSearchlocalComponent } from '../shared/component2/out-select-searchlocal/out-select-searchlocal.component';

import { RouterModule, Routes } from '@angular/router';

import { Tabledata3Component } from '../shared/components/tabledata3/tabledata3.component';

import { PagetestComponent } from '../pages/pagetest/pagetest.component';
import { CompanyOptionComponent } from '../pages/company-option/company-option.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    BoutselectComponent,
    OutSelectSearchlocalComponent,
    Tabledata3Component,

    PagetestComponent,
    CompanyOptionComponent,
  ],
  exports: [PagetestComponent, CompanyOptionComponent],
})
export class PagemoduleModule {}
