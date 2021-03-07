import { Injectable, NgZone, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { FirebaseAuthDialogComponent } from './firebase-auth-dialog/firebase-auth-dialog.component';
import { environment } from 'src/environments/environment';
import { BackendService } from '../backend-service/backend.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private readonly urlAddUser = `${environment.backendUrl}/users/add_user`;

  private firebaseConfig = {
    apiKey: 'AIzaSyBqFQx5-GcuKBkliaNu4V59AQh02j-TH64',
    authDomain: 'jwebsite-e97d3.firebaseapp.com',
    projectId: 'jwebsite-e97d3',
    storageBucket: 'jwebsite-e97d3.appspot.com',
    messagingSenderId: '820752252257',
    appId: '1:820752252257:web:315e49f5df8bd0693dd920',
    measurementId: 'G-Q7F4THFEEG'
  };

  private _user: BehaviorSubject<firebase.User | null> = new BehaviorSubject(null);
  private ui;

  constructor(private ngZone: NgZone, private backendService: BackendService) {
    firebase.initializeApp(this.firebaseConfig);
    this.ui = this.ui || new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().onAuthStateChanged((user) => {
      this._user.next(user);
    });
  }

  public openDialog(matDialogService: MatDialog) {
    var dialog = matDialogService.open(FirebaseAuthDialogComponent, {
      data: matDialogService,
      panelClass: 'firebase-auth-no-padding'
    });
    dialog.afterOpened().subscribe(() => {
      this.createSignIn(dialog);
    });
  }

  public get user$(): BehaviorSubject<firebase.User | null> {
    return this._user;
  }

  private createSignIn(matDialog: MatDialogRef<FirebaseAuthDialogComponent, any>) {
    this.ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.tryCreateUser$().subscribe();
          this.ngZone.run(() => matDialog.close());
        }
      }
    });
  }

  private tryCreateUser$() {
    return this.getFirebaseIdToken$().pipe(
      switchMap((idToken) =>
        this.backendService.httpRequest(`${this.urlAddUser}?idToken=${idToken}`)
      )
    );
  }

  private getFirebaseIdToken$() {
    return from(firebase.auth().currentUser.getIdToken(true));
  }
}
