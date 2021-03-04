import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase-auth-service/firebase-auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  public isAuthorized$: Observable<boolean>;
  public title: string = 'JWebsite';

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private matDialogService: MatDialog
  ) {
    this.isAuthorized$ = firebaseAuthService.user$.pipe(map((user) => !!user));
  }

  ngOnInit() {}

  createLoginDialog() {
    this.firebaseAuthService.openDialog(this.matDialogService);
  }
}
