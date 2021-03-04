import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import { Card } from '../../../../backend/backend-models';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from '../firebase-auth-service/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly urlCards = `${environment.backendUrl}/base_cards/cards`;

  constructor(
    private backendService: BackendService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  public searchCards$(cardDetails: Partial<Card>): Observable<Card[]> {
    const user = this.firebaseAuthService.user$.value;
    return this.backendService.httpRequest(
      `${this.urlCards}/?${Object.keys(cardDetails).reduce(
        (prev, curr) => prev + curr + '=' + cardDetails[curr] + '&',
        ''
      )}username=${user.email}`
    );
  }

  public getCards$(setId: number): Observable<Card[]> {
    const user = this.firebaseAuthService.user$.value;
    return this.backendService.httpRequest(
      `${this.urlCards}/?SetId=${setId}&username=${user.email}`
    );
  }
}
