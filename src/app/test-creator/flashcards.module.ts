import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMatsModule } from 'src/app/shared/angular-mats/angular-mats.module';
import { UsersLibModule } from '../shared/users-lib/users-lib.module';
import { FlashcardMainComponent } from './flashcard-main/flashcard-main.component';
import { SupersetComponent } from './superset/superset.component';
import { TestOptionsComponent } from './test-options/test-options.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FlashcardMainComponent, SupersetComponent, TestOptionsComponent],
  imports: [CommonModule, AngularMatsModule, UsersLibModule, ReactiveFormsModule],
  exports: [FlashcardMainComponent]
})
export class FlashcardsModule {}
