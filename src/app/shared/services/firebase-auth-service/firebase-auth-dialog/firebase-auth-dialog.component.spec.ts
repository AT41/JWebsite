import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseAuthDialogComponent } from './firebase-auth-dialog.component';

describe('FirebaseAuthDialogComponent', () => {
  let component: FirebaseAuthDialogComponent;
  let fixture: ComponentFixture<FirebaseAuthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirebaseAuthDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseAuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
