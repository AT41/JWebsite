import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private readonly sessionsUrl = `${environment.backendUrl}/sessions`;
  private readonly localStorageNonceKey = 'currentNonce';
  private readonly localStorageUsernameKey = 'currentUsername';

  constructor(private backendService: BackendService) {}

  public isAuthorized$(): Observable<boolean> {
    const username = window.localStorage.getItem(this.localStorageUsernameKey);
    const session_token = window.localStorage.getItem(this.localStorageNonceKey);

    return of(
      false
    ); /*this.backendService.httpRequest(
      `${this.sessionsUrl}?username=${username}&session_token=${session_token}`
    ) as Observable<boolean>;*/
  }

  public saveLoginSession(username: string, sessionNonce: string) {
    window.localStorage.setItem(this.localStorageUsernameKey, username);
    window.localStorage.setItem(this.localStorageNonceKey, sessionNonce);
  }

  // TODO ANTHONY Replace with google auth
  public getLoggedInUser(): { username: string; sessionToken: string } {
    return {
      username: 'global', //window.localStorage.getItem(this.localStorageUsernameKey),
      sessionToken: '' //window.localStorage.getItem(this.localStorageNonceKey)
    };
  }
}
