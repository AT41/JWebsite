import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultipleChoiceComponent } from './question-multiple-choice.component';

describe('QuestionMultipleChoiceComponent', () => {
  let component: QuestionMultipleChoiceComponent;
  let fixture: ComponentFixture<QuestionMultipleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMultipleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
