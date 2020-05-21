import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { LoginComponent } from './login.component';
import {LoginService} from './login-service/login.service';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const correctUsername = 'SomeUsername';
  const correctPassword = 'SomePassword';

  class mockLoginService {
    tryLogin(username: string, password: string) {
      return of(false);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        {provide: LoginService, useClass: mockLoginService}
      ]
    })
    .compileComponents();

    const loginService = TestBed.get(LoginService);
    const formBuilder = TestBed.get(FormBuilder);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit loginForm\'s username and password', () => {
    component.loginForm.setValue({username: correctUsername, password: correctPassword});

    component.loginAttempt.subscribe((attempt) => expect(attempt).toBeTruthy);
    component.onSubmit();
  })
});
