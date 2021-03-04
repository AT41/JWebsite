import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, Englishdefinition } from 'src/backend/backend-models';
import { BackendService } from '../backend-service/backend.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FirebaseAuthService } from '../firebase-auth-service/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnglishdefinitionService {
  private readonly urlEnglishDefinitions = `${environment.backendUrl}/englishdefinitions`;

  constructor(
    private backendService: BackendService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  public searchDefinitions$(answer: String): Observable<Englishdefinition[]> {
    const user = this.firebaseAuthService.user$.value;
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
