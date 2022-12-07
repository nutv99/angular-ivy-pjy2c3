import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'; 

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BoutselectComponent} from '../shared/component2/boutselect/boutselect.component' ;
import {OutSelectSearchlocalComponent} from '../shared/component2/out-select-searchlocal/out-select-searchlocal.component' ;

import {PagetestComponent }  from '../pages/pagetest/pagetest.component' ;

@NgModule({
  imports: [
    CommonModule,FontAwesomeModule
  ],
  declarations: [BoutselectComponent,OutSelectSearchlocalComponent,PagetestComponent],
  exports:[PagetestComponent] 
})

export class PagemoduleModule { 
 

}