import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserAuthenticationService } from '../../user-authentication-service/user-authentication.service';
import { QueryType } from '@at41/login-module-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly usersUrl = `${environment.backendUrl}/users`;

  // TODO need error catching in case server is down
  public tryLogin(username: string, password: string): Observable<string> {
    // There are a lot of different options you can pass, for example { observe: 'response' } which returns HttpResponse rather than JSON Object
    const url = this.createBackendUrl(QueryType.tryLogin, username, password);
    return this.backendService.httpRequest(url).pipe(
      tap((nonce) => {
        if (nonce != null) {
          this.userAuthenticationService.saveLoginSession(username, nonce);
        }
      })
    );
  }

  public createUser(username: string, password: string): Observable<boolean> {
    const url = this.createBackendUrl(QueryType.createAccount, username, password);
    return this.backendService.httpRequest(url).pipe(
      catchError((err) => {
        console.dir(err);
        return of(false);
      }),
      map((result) => !!result)
    );
  }

  public checkIfUsernameTaken(username: string): Observable<boolean> {
    const url = this.createBackendUrl(QueryType.checkIfUsernameTaken, username);
    return this.backendService.httpRequest(url).pipe(map((result) => !!result));
  }

  private createBackendUrl(requestType: QueryType, username?: string, password?: string): string {
    let backendUrl = this.usersUrl + '?queryType=' + requestType;
    if (username != null) {
      backendUrl += '&id=' + username;
    }
    if (password != null) {
      backendUrl += '&password=' + password;
    }
    return backendUrl;
  }

  constructor(
    private backendService: BackendService,
    private userAuthenticationService: UserAuthenticationService
  ) {}
}
