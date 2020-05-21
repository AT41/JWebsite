import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login-component/login-service/login.service';
import { Observable, throwError } from 'rxjs';
import { switchMap, debounceTime, shareReplay } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUserComponent implements OnInit {

  public newUserFormGroup: FormGroup;
  public isUsernameTaken: Observable<Boolean>;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private changeDetectorRef: ChangeDetectorRef) { 
    this.newUserFormGroup= this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.isUsernameTaken = this.newUserFormGroup.get('username').valueChanges.pipe(
      debounceTime(200),
      switchMap((input: string) => 
        this.loginService.checkIfUsernameTaken(input)
      ),
      shareReplay(1)
    );
  }

  ngOnInit() {
    this.newUserFormGroup.get('username').valueChanges.subscribe(val => this.changeDetectorRef.detectChanges);
  }

  onSubmit() {
    this.loginService.createUser(this.newUserFormGroup.get('username').value, this.newUserFormGroup.get('password').value).subscribe(val => {
      console.log(val);
    });
  }

  public static createDialog(matDialogService: MatDialog): MatDialogRef<any> {
    return matDialogService.open(RegisterUserComponent);
  }
}
