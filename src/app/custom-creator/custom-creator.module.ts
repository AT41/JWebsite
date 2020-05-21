import { NgModule } from '@angular/core';
import { CustomCreatorComponent } from './custom-creator.component';
import { CommonModule } from '@angular/common';
import { AngularMatsModule } from '../shared/angular-mats/angular-mats.module';

@NgModule({
  imports: [CommonModule, AngularMatsModule],
  declarations: [CustomCreatorComponent],
  entryComponents: [CustomCreatorComponent]
})
export class CustomCreatorModule { }
