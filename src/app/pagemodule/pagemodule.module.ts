import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagetestComponent }  from '../pages/pagetest/pagetest.component' ;

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PagetestComponent],
  exports:[PagetestComponent] 
})

export class PagemoduleModule { 


}