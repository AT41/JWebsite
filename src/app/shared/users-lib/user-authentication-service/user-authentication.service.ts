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

    return this.backendService.httpRequest(
      `${this.sessionsUrl}?username=${username}&session_token=${session_token}`
    ) as Observable<boolean>;
  }

  public saveLoginSession(username: string, sessionNonce: string) {
    window.localStorage.setItem(this.localStorageUsernameKey, username);
    window.localStorage.setItem(this.localStorageNonceKey, sessionNonce);
  }

  // TODO ANTHONY Make sure the methods calling this all contain the correct Nonces, or make a separate guard for verification
  public getLoggedInUser(): { username: string; sessionToken: string } {
    return {
      username: window.localStorage.getItem(this.localStorageUsernameKey),
      sessionToken: window.localStorage.getItem(this.localStorageNonceKey)
    };
  }
}
