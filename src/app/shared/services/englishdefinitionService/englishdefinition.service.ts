import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, Englishdefinition } from 'src/backend/backend-models';
import { UserAuthenticationService } from '../../users-lib/user-authentication-service/user-authentication.service';
import { BackendService } from '../backend-service/backend.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnglishdefinitionService {
  private readonly urlEnglishDefinitions = `${environment.backendUrl}/englishdefinitions`;

  constructor(
    private backendService: BackendService,
    private userAuthService: UserAuthenticationService
  ) {}

  public searchDefinitions$(answer: String): Observable<Englishdefinition[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(
      `${this.urlEnglishDefinitions}/search_definition?definition=${answer}`
    );
  }

  public getDefinitionsForCards$(cards: Card[]): Observable<(Card & Englishdefinition)[]> {
    return this.backendService
      .httpRequest(
        `${this.urlEnglishDefinitions}/match_card_ids?cardIds=${cards
          .map((card) => card.Id)
          .join(',')}`
      )
      .pipe(
        map((defs: Englishdefinition[]) =>
          cards.map((card) => {
            const defsForCard = defs.filter((def) => def.CardId === card.Id);
            return Object.assign(
              card,
              defsForCard.reduce((prev, curr, index) => {
                if (index === 0) {
                  return prev;
                }
                prev.Definition = prev.Definition.concat(';' + curr.Definition);
                return prev;
              }, defsForCard[0])
            );
          })
        )
      );
  }
}
