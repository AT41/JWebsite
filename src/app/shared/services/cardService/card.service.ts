import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import { Card, KanjiCard } from '../../../../backend/backend-models';
import { UserAuthenticationService } from '../../users-lib/user-authentication-service/user-authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly urlCards = `${environment.backendUrl}/base_cards/cards`;
  private readonly urlKanjiCards = `${environment.backendUrl}/base_cards/kanji_cards`;

  constructor(
    private backendService: BackendService,
    private userAuthService: UserAuthenticationService
  ) {}

  public searchCards$(cardDetails: Partial<Card>): Observable<Card[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(
      `${this.urlCards}/?${Object.keys(cardDetails).reduce(
        (prev, curr) => prev + curr + '=' + cardDetails[curr] + '&',
        ''
      )}username=${user.username}&session_token=${user.sessionToken}`
    );
  }

  public getCards$(setId: number): Observable<Card[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(
      `${this.urlCards}/?SetId=${setId}&username=${user.username}&session_token=${user.sessionToken}`
    );
  }

  public getKanjiCards$(setId: number): Observable<KanjiCard[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(
      `${this.urlKanjiCards}/?setId=${setId}&username=${user.username}&session_token=${user.sessionToken}`
    );
  }
}
