import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMatsModule } from '../angular-mats/angular-mats.module';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
      ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AngularMatsModule
  ],
  exports: [
      ToolbarComponent
  ]
})
export class ToolbarModule { }
