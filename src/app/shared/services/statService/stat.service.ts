import { Injectable } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { Stat } from '../../../../backend/backend-models';
import { BackendService } from '../backend-service/backend.service';
import { UserAuthenticationService } from '../../users-lib/user-authentication-service/user-authentication.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private readonly urlGetStats = `${environment.backendUrl}/stats/get_stats`;
  private readonly urlIncrementStats = `${environment.backendUrl}/stats/increment_stats`;

  constructor(
    private backendService: BackendService,
    private userAuthenticationService: UserAuthenticationService
  ) {}

  public getStats(statOwner: string, cardId: number): Observable<Stat> {
    return this.backendService.httpRequest(
      `${this.urlGetStats}/?statOwner=${statOwner}&cardId=${cardId}`
    );
  }

  public incrementStats(isCorrect: boolean, cardId: number) {
    const user = this.userAuthenticationService.getLoggedInUser();
    return this.userAuthenticationService
      .isAuthorized$()
      .pipe(
        switchMap((isAuthorized) =>
          iif(
            () => isAuthorized,
            this.backendService.httpRequest(
              `${this.urlIncrementStats}/?isCorrect=${isCorrect}&statOwner=${user.username}&cardId=${cardId}&session_token=${user.sessionToken}`
            ),
            of(null)
          )
        )
      );
  }
}
