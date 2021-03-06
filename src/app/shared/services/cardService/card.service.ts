import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import { Card } from '../../../../backend/backend-models';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from '../firebase-auth-service/firebase-auth.service';
import { TestOptions } from 'src/app/test-creator/flashcard-main/flashcard-main.component';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly urlCards = `${environment.backendUrl}/base_cards/cards`;
  private readonly urlCardCount = `${environment.backendUrl}/base_cards/cardCount`;

  constructor(
    private backendService: BackendService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  public searchCards$(cardDetails: Partial<Card>): Observable<Card[]> {
    const user = this.firebaseAuthService.user$.value;
    return this.backendService.httpRequest(
      `${this.urlCards}?${Object.keys(cardDetails).reduce(
        (prev, curr) => prev + curr + '=' + cardDetails[curr] + '&',
        ''
      )}${user ? 'username=' + user.email : ''}`
    );
  }

  public getCards$(setIds: number[], testOptions?: TestOptions): Observable<Card[]> {
    const user = this.firebaseAuthService.user$.value;
    const backendTestOptions = testOptions
      ? Object.keys(testOptions).map((key) => `${key}=${testOptions[key]}`)
      : null;
    return this.backendService.httpRequest(
      `${this.urlCards}?setIds=${setIds.sort((a, b) => a - b).join(',')}${
        user ? '&username=' + user.email : ''
      }${testOptions ? '&' + backendTestOptions.join('&') : ''}`
    );
  }

  public getCardCount$(setIds: number[]): Observable<number> {
    const user = this.firebaseAuthService.user$.value;
    return this.backendService.httpRequest(
      `${this.urlCardCount}?setIds=${setIds.join(',')}${user ? '&username=' + user.email : ''}`
    );
  }
}
