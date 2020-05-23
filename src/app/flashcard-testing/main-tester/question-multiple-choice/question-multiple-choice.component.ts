import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-multiple-choice',
  templateUrl: './question-multiple-choice.component.html',
  styleUrls: ['./question-multiple-choice.component.scss']
})
export class QuestionMultipleChoiceComponent implements OnInit {
  public question: string = '漢字';
  public options: string[] = ['がんじ', 'かんし', 'がんし', 'かんじ'];

  constructor() {}

  ngOnInit() {}
}
