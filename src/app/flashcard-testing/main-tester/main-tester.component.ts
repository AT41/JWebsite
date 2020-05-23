import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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
  public currentQuestionIndex = 0;
  public disableNavigation = false;
  constructor(private testStarterService: TestStarterService) {}

  ngOnInit() {
    this.mainTesterCards = this.testStarterService.mainTesterCards || []; // Defaults to []
    this.locked = this.mainTesterCards.map(() => false);
    this.userAnswers = this.mainTesterCards.map(() => '');
  }
}
