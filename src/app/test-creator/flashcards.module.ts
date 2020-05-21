import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMatsModule } from 'src/app/shared/angular-mats/angular-mats.module';
import { UsersLibModule } from '../shared/users-lib/users-lib.module';
import { FlashcardMainComponent } from './flashcard-main/flashcard-main.component';
import { SupersetComponent } from './superset/superset.component';

@NgModule({
  declarations: [
      FlashcardMainComponent,
      SupersetComponent
  ],
  imports: [
    CommonModule,
    AngularMatsModule,
    UsersLibModule
  ],
  exports: [
    FlashcardMainComponent
  ]
})
export class FlashcardsModule { }
