import { Injectable } from '@angular/core';
import { Observable, iif, of } from 'rxjs';
import { Stat } from '../../../../backend/backend-models';
import { BackendService } from '../backend-service/backend.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from '../firebase-auth-service/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private readonly urlGetStats = `${environment.backendUrl}/stats/get_stats`;
  private readonly urlIncrementStats = `${environment.backendUrl}/stats/increment_stats`;

  constructor(
    private backendService: BackendService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  public getStats(statOwner: string, cardId: number): Observable<Stat> {
    return this.backendService.httpRequest(
      `${this.urlGetStats}/?statOwner=${statOwner}&cardId=${cardId}`
    );
  }

  public incrementStats(isCorrect: boolean, cardId: number) {
    var user = this.firebaseAuthService.user$.value;
    return user
      ? this.backendService.httpRequest(
          `${this.urlIncrementStats}/?isCorrect=${isCorrect}&statOwner=${user.email}&cardId=${cardId}`
        )
      : of(null);
  }
}
