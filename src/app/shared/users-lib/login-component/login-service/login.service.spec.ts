import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import {of} from 'rxjs';

let mockHttp: jasmine.SpyObj<{get: jasmine.Spy}>;
let service: LoginService;

describe('LoginService', () => {
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LoginService(mockHttp as any);
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const newService: LoginService = new LoginService(mockHttp as any);
    expect(newService).toBeTruthy();
  });

  it('should return true for tryLogin', () => {
    mockHttp.get.and.returnValue(of(true));

    service.tryLogin('MyUser', '123').subscribe(val => expect(val).toBeTruthy(), fail);
  })
});