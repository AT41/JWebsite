import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMatsModule } from 'src/app/shared/angular-mats/angular-mats.module';
import { MainTesterComponent } from './main-tester/main-tester.component';
import { QuestionBoxComponent } from './main-tester/question-box/question-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryPageComponent } from './main-tester/summary-page/summary-page.component';
import { QuestionMarkerService } from './main-tester/question-marker.service';
import { DropdownTabDirective } from './main-tester/question-box/dropdown-tab.directive';

@NgModule({
  declarations: [
    MainTesterComponent,
    QuestionBoxComponent,
    SummaryPageComponent,
    DropdownTabDirective
  ],
  providers: [QuestionMarkerService],
  imports: [CommonModule, AngularMatsModule, ReactiveFormsModule],
  exports: []
})
export class FlashcardTestingModule {}
