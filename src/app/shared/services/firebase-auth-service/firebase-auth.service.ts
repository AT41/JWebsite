import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseAuthDialogComponent } from './firebase-auth-dialog/firebase-auth-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
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

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    this.ui = this.ui || new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Signed in as:', user);
      this._user.next(user);
    });
  }

  public openDialog(matDialogService: MatDialog) {
    matDialogService
      .open(FirebaseAuthDialogComponent, {
        data: matDialogService,
        panelClass: 'firebase-auth-no-padding'
      })
      .afterOpened()
      .subscribe(() => {
        this.createSignIn(matDialogService);
      });
  }

  public get user$(): BehaviorSubject<firebase.User | null> {
    return this._user;
  }

  private createSignIn(matDialogService: MatDialog) {
    this.ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInFlow: 'popup',
      signInSuccessUrl: './'
    });
  }
}
