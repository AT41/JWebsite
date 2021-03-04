import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import { Set } from '../../../../backend/backend-models';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from '../firebase-auth-service/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SetService {
  private readonly url = `${environment.backendUrl}/sets`;

  constructor(
    private backendService: BackendService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  public getSets$(supersetId: number): Observable<Set[]> {
    const user = this.firebaseAuthService.user$.value;
    return this.backendService.httpRequest(
      `${this.url}?supersetId=${supersetId}&username=${user.email}`
    );
  }
}
