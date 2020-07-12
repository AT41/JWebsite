import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StatService } from 'src/app/shared/services/statService/stat.service';
import { MainTesterCard } from '../../test-starter.service';
import { CardService } from 'src/app/shared/services/cardService/card.service';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class QuestionBoxOptions {
  markQuestionsImmediately?: boolean;
  showAnswersImmediately?: boolean;
  questionPrompt?: string;
}

@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionBoxComponent {
  // TODO ANTHONY Consider hashing the answers, add randomly generated string for each session to salt the hash
  @Input() mainTesterCard: MainTesterCard;
  @Input() buttonState: 'normal' | 'beginning' | 'end' = 'normal';
  @Input() options?: QuestionBoxOptions = {
    markQuestionsImmediately: true,
    showAnswersImmediately: true
  };
  @Input() set locked(lock: boolean) {
    if (lock) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
  @Output() lockedChange = new EventEmitter<boolean>();
  @Input() set userAnswer(userAnswer: string) {
    this.formControl.setValue(userAnswer);
  }
  @Output() userAnswerChange = new EventEmitter<string>();
  @Output() pageTurn = new EventEmitter<1 | -1>();
  @Output() isDisabling = new EventEmitter<boolean>();
  public formControl: FormControl;
  public possibleAnswers: Observable<string[]>;

  public get isAnswerRight(): 'yes' | 'no' | null {
    if (!this.formControl.disabled) {
      return null;
    }
    if (this.formControl.value === this.mainTesterCard.answer) {
      return 'yes';
    } else {
      return 'no';
    }
  }

  private waitAfterSubmit = 1000;

  constructor(private statService: StatService, private cardService: CardService) {
    this.formControl = new FormControl('', Validators.required);
    this.formControl.valueChanges.subscribe((userAnswer) => this.userAnswerChange.emit(userAnswer));
    this.possibleAnswers = this.formControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((val) => this.generateAnswers(val))
    );
  }

  onNext() {
    if (this.options.markQuestionsImmediately) {
      this.submit();
    } else {
      this.pageTurn.emit(1);
    }
  }

  private submit() {
    this.lockedChange.emit(true);
    this.isDisabling.emit(true);
    this.statService
      .incrementStats(
        this.mainTesterCard.answer === this.formControl.value,
        this.mainTesterCard.cardId
      )
      .subscribe();
    setTimeout(() => {
      this.isDisabling.emit(false);
      this.pageTurn.emit(1);
    }, this.waitAfterSubmit);
  }

  private generateAnswers(guess: string): Observable<string[]> {
    return this.cardService
      .searchCards$({ Answer: guess })
      .pipe(map((cards) => cards.map((card) => card.Answer)));
  }
}
