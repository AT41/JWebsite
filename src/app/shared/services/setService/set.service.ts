import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import { Set } from '../../../../backend/backend-models';
import { UserAuthenticationService } from '../../users-lib/user-authentication-service/user-authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetService {
  private readonly url = `${environment.backendUrl}/sets`;

  constructor(
    private backendService: BackendService,
    private userAuthService: UserAuthenticationService
  ) {}

  public getSets$(supersetId: number): Observable<Set[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(
      `${this.url}?supersetId=${supersetId}&username=${user.username}&session_token=${user.sessionToken}`
    );
  }
}
