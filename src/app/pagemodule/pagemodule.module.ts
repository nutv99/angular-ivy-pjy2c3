import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
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