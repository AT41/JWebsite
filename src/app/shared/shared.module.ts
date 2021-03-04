import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FirebaseAuthDialogComponent } from './services/firebase-auth-service/firebase-auth-dialog/firebase-auth-dialog.component';
import { AngularMatsModule } from './angular-mats/angular-mats.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  declarations: [FirebaseAuthDialogComponent],
  imports: [CommonModule, AngularMatsModule, ToolbarModule],
  exports: [ToolbarModule]
})
export class SharedModule {}
