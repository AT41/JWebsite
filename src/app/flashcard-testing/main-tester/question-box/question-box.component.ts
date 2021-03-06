import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StatService } from 'src/app/shared/services/statService/stat.service';
import { MainTesterCard } from '../../test-starter.service';
import { EnglishdefinitionService } from 'src/app/shared/services/englishdefinitionService/englishdefinition.service';
import { map, switchMap, debounceTime, debounce } from 'rxjs/operators';
import { Observable, timer, EMPTY, of } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

export class QuestionBoxOptions {
  markQuestionsImmediately?: boolean;
  showAnswersImmediately?: boolean;
  questionPrompt?: string;
  showPossibleAnswers?: boolean;
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
    showAnswersImmediately: true,
    showPossibleAnswers: true
  };
  @Input() set locked(lock: boolean) {
    if (lock) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }
  @Output() lockedChange = new EventEmitter<boolean>();
  @Input() set userAnswer(userAnswer: string) {
    this.formControl.setValue(userAnswer);
  }
  @Output() userAnswerChange = new EventEmitter<string>();
  @Output() pageTurn = new EventEmitter<1 | -1>();
  @Output() isDisabling = new EventEmitter<boolean>();

  @ViewChild(MatAutocompleteTrigger) dropdown: MatAutocompleteTrigger | null;

  public formControl: FormControl;
  public possibleAnswers: Observable<string[]>;

  public get isAnswerRight(): 'yes' | 'no' | null {
    if (this.formControl.enabled) {
      return null;
    }
    return this.mainTesterCard.answers.some((answer) => answer === this.formControl.value)
      ? 'yes'
      : 'no';
  }

  private waitAfterSubmit = 1000;

  constructor(
    private statService: StatService,
    private englishdefinitionsService: EnglishdefinitionService
  ) {
    this.formControl = new FormControl('', Validators.required);
    this.formControl.valueChanges.subscribe((userAnswer) => this.userAnswerChange.emit(userAnswer));
  }

  ngAfterViewInit() {
    if (this.options.showPossibleAnswers) {
      this.possibleAnswers = this.formControl.valueChanges.pipe(
        debounce((val) => (val === '' ? EMPTY : timer(300))),
        switchMap((val) => (val === '' ? of([]) : this.generateAnswers(val)))
      );
    }
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
    this.tryClosingDropdown();
    setTimeout(() => {
      this.statService
        .incrementStats(this.isAnswerRight === 'yes', this.mainTesterCard.cardId)
        .subscribe();
      this.isDisabling.emit(false);
      this.pageTurn.emit(1);
    }, this.waitAfterSubmit);
  }

  private tryClosingDropdown() {
    if (!!this.dropdown) {
      this.dropdown.closePanel();
    }
  }

  private generateAnswers(guess: string): Observable<string[]> {
    const cardSearch = {} as any;
    guess = guess.toLowerCase();
    return this.englishdefinitionsService
      .searchDefinitions$(guess)
      .pipe(map((vals) => vals.map((val) => val['Definition'])));
  }
}
