import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {PagetestComponent }  from '../pages/pagetest/pagetest.component' ;

@NgModule({
  imports: [
    CommonModule,FontAwesomeModule
  ],
  declarations: [PagetestComponent],
  exports:[PagetestComponent] 
})

export class PagemoduleModule { 


}