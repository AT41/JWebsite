import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMatsModule } from '../angular-mats/angular-mats.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {LoginService} from './login-component/login-service/login.service';

import { LoginComponent } from './login-component/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [LoginComponent, RegisterUserComponent],
  imports: [
    CommonModule,
    AngularMatsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    LoginComponent,
    RegisterUserComponent
  ],
  providers: [
    LoginService
  ],
  entryComponents: [
    LoginComponent,
    RegisterUserComponent
  ]
})
export class UsersLibModule { }
