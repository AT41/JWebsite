import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardMainComponent } from './flashcard-main.component';

describe('FlashcardMainComponent', () => {
  let component: FlashcardMainComponent;
  let fixture: ComponentFixture<FlashcardMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
