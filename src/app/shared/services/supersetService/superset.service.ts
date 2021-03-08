import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import { Superset } from '../../../../backend/backend-models';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from '../firebase-auth-service/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupersetService {
  private readonly url = `${environment.backendUrl}/supersets`;

  constructor(
    private backendService: BackendService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  public getSupersets$(): Observable<Superset[]> {
    const user = this.firebaseAuthService.user$.value;
    return this.backendService.httpRequest(`${this.url}?${user ? 'username=' + user.email : ''}`);
  }
}
