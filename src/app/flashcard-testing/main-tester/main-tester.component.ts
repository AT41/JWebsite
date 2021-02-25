import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainTesterCard, TestStarterService } from '../test-starter.service';

@Component({
  selector: 'app-main-tester',
  templateUrl: './main-tester.component.html',
  styleUrls: ['./main-tester.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainTesterComponent implements OnInit {
  public mainTesterCards: MainTesterCard[];
  public locked: boolean[];
  public userAnswers: string[];
  public disableNavigation = false;
  public currentQuestionIndex = 0;

  constructor(private testStarterService: TestStarterService) {}

  ngOnInit() {
    this.mainTesterCards = this.testStarterService.mainTesterCards;
    this.locked = this.mainTesterCards.map(() => false);
    this.userAnswers = this.mainTesterCards.map(() => '');
  }

  public isAnswerRight(answers: string[], index: number): Observable<boolean> {
    return of(answers.some((answer) => answer === this.userAnswers[index]));
  }
}
