import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserAuthenticationService } from '../users-lib/user-authentication-service/user-authentication.service';
import { LoginComponent } from '../users-lib/login-component/login.component';
import { RegisterUserComponent } from '../users-lib/register-user/register-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  public isAuthorized$: Observable<boolean>;
  public title: string = 'JWebsite';

  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private matDialogService: MatDialog
  ) {
    this.isAuthorized$ = this.userAuthenticationService.isAuthorized$();
  }

  ngOnInit() {}

  createRegisterDialog() {
    const registerModal = RegisterUserComponent.createDialog(this.matDialogService);
  }

  createLoginDialog() {
    const loginModal = LoginComponent.createDialog(this.matDialogService);
  }
}
