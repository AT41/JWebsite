import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './login-service/login.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

// TODO LONGTERM: Bundle the whole login functionality into its own library for future uses

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @Output() loginAttempt = new EventEmitter<boolean>();
  private static currentDialog: MatDialogRef<LoginComponent>;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    const usernameEntry = this.loginForm.value.username;
    const passwordEntry = this.loginForm.value.password;
    this.loginService.tryLogin(usernameEntry, passwordEntry).subscribe((nonce: string) => {
      this.loginAttempt.next(!!nonce);
      if (!!nonce) {
        LoginComponent.currentDialog.close();
      }
    });
  }

  public static createDialog(matDialogService: MatDialog): MatDialogRef<LoginComponent> {
    if (!!this.currentDialog) {
      console.warn('There\'s already a login dialog open. The current dialog will be overwritten.');
    }
    this.currentDialog = matDialogService.open(LoginComponent, {
      data: matDialogService
    });

    return this.currentDialog;
  }
}
