import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { PagemoduleModule } from './pagemodule/pagemodule.module' ;

import { HttpClientModule } from '@angular/common/http';

import {
  NgbDatepickerConfig,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { Tabledata1Component } from './shared/components/tabledata1/tabledata1.component';
import { HelloComponent } from './hello.component';
import { DepartmentComponent } from './pages/department/department.component';
import { departmentListComponent } from './pages/department/departmentList.component';

import { CategoryComponent } from './pages/category/category.component';
import { categoryListComponent } from './pages/category/categoryList.component';

import { GroupItemComponent } from './pages/groupitem/group-item.component';
import { TableDocumentComponent } from './pages/table-document/table-document.component';

import { Tabledata2Component } from './shared/components/tabledata2/tabledata2.component';
import { SearchselectComponent } from './shared/components/searchselect/searchselect.component';
import { OutSelect } from './shared/components/outselect/outselect.component';
import { CallAPIDirective } from './shared/directives/call-api.directive';
import { TopheaderComponent } from './shared/components/topheader/topheader.component';
import { HeaderformComponent } from './shared/components/headerform/headerform.component';
import { Outselectv2Component } from './shared/components/outselectv2/outselectv2.component';

import { CrudComponent } from './pages/crud/crud.component';
import { tttComponent } from './ttt/ttt.component';
import { PagetestComponent } from './pages/pagetest/pagetest.component';
import { CompanyOptionComponent } from './pages/company-option/company-option.component';

import { CompanyoptionComponent } from'./pages/companyoption/companyoption.component';
import { CompanyoptionListComponent } from './pages/companyoption/companyoptionList.component';

import { CompanyComponent } from'./pages/company/company.component' ;

import { PaymentchannelComponent } from'./pages/paymentchannel/paymentchannel.component';
import { PaymentchannelListComponent } from './pages/paymentchannel/paymentchannelList.component';

import { DepartmentFormComponent } from'./pages/departmentForm/departmentForm.component';
import { DepartmentListComponent } from './pages/departmentForm/departmentList.component';

import { ItemmasterFormComponent } from'./pages/itemmasterForm/itemmasterForm.component';
import { ItemmasterListComponent } from './pages/itemmasterForm/itemmasterList.component';

// ใส่ใน Declaration

const appRoutes: Routes = [
  { path: 'departmentList/:pageno', component: departmentListComponent },
  { path: 'departmentForm/:id', component: DepartmentComponent },
  { path: 'category/:pageno', component: categoryListComponent },
  { path: 'categoryForm/:id', component: CategoryComponent },
  { path: 'group/1', component: GroupItemComponent },
  { path: 'tbldocument', component: TableDocumentComponent },
   { path: 'test', component:PagetestComponent },
  { path: 'tbldocument/:id', component: TableDocumentComponent },
  { path: 'ccoption', component: CompanyOptionComponent },
  { path: 'companyoptionList', component: CompanyoptionListComponent },
  { path: 'companyoption/:id', component: CompanyoptionComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'paymentchannelList', component: PaymentchannelListComponent },
  { path: 'paymentchannel/:id', component: PaymentchannelComponent },
  { path: 'departmentList', component: DepartmentListComponent },
  { path: 'departmentForm/:id', component: DepartmentFormComponent },
  { path: 'itemmasterList', component: ItemmasterListComponent },
  { path: 'itemmasterForm/:id', component: ItemmasterFormComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];


// {
//   path: 'contact',
//   component: TableDocumentComponent,
//   outlet: 'popup'
// },

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    PagemoduleModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only set true
    ),
  ],
  declarations: [
    AppComponent,
    Tabledata1Component,
    HelloComponent,
    DepartmentComponent,
    departmentListComponent,
    TableDocumentComponent,
    Tabledata2Component,
    SearchselectComponent,
    GroupItemComponent,
    OutSelect,
    CallAPIDirective,
    CrudComponent,
    tttComponent,
    CategoryComponent,
    categoryListComponent,
    TopheaderComponent,
    HeaderformComponent,
    Outselectv2Component,    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
