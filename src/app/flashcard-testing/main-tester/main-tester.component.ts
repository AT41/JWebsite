import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MainTesterCard, TestStarterService } from '../test-starter.service';
import { QuestionMarkerService } from './question-marker.service';

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

  constructor(
    private testStarterService: TestStarterService,
    public questionMarkerService: QuestionMarkerService
  ) {}

  ngOnInit() {
    this.mainTesterCards = this.testStarterService.mainTesterCards;
    this.locked = this.mainTesterCards.map(() => false);
    this.userAnswers = this.mainTesterCards.map(() => '');
  }
}
