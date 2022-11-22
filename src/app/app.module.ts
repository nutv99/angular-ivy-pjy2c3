import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

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

import { CrudComponent } from './pages/crud/crud.component';
import { tttComponent } from './ttt/ttt.component';

// ใส่ใน Declaration

const appRoutes: Routes = [
  { path: 'departmentList/:pageno', component: departmentListComponent },
  { path: 'departmentForm/:id', component: DepartmentComponent },
  { path: 'category/:pageno', component: categoryListComponent },
  { path: 'categoryForm/:id', component: CategoryComponent },
  { path: 'group/1', component: GroupItemComponent },
  { path: 'tbldocument', component: TableDocumentComponent },
  { path: 'tbldocument/:id', component: TableDocumentComponent },
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
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,

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
    categoryListComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
