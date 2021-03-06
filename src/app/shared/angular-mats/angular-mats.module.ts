import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule
  ]
})
export class AngularMatsModule {}
