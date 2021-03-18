import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupersetService } from '../../shared/services/supersetService/superset.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SetService } from '../../shared/services/setService/set.service';
import { Superset, Set } from '../../../backend/backend-models';
import { TestStarterService } from 'src/app/flashcard-testing/test-starter.service';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { CardService } from 'src/app/shared/services/cardService/card.service';
import { first, map, shareReplay, switchMap, tap } from 'rxjs/operators';

export interface TestOptions {
  yomigana: boolean;
  numberOfQuestions: number;
  includedCards: number[];
}

@Component({
  selector: 'app-flashcard-main',
  templateUrl: './flashcard-main.component.html',
  styleUrls: ['./flashcard-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashcardMainComponent implements OnInit {
  public supersets$: Observable<Superset[]>;
  public sets$: BehaviorSubject<Set[]> = new BehaviorSubject(null);
  public get currentSuperset(): Superset {
    return this._currentSuperset;
  }
  public set currentSuperset(superset: Superset) {
    this.setService.getSets$(superset.Id).subscribe((sets) => this.sets$.next(sets));
    this._currentSuperset = superset;
    this.clearSelectedSets();
  }
  private _currentSuperset: Superset;

  public hoveredIndex = -1;

  public testFormGroup: FormGroup;

  public totalCards$: Observable<number>;

  constructor(
    private supersetService: SupersetService,
    private setService: SetService,
    private testStarter: TestStarterService,
    private cardService: CardService,
    private fb: FormBuilder
  ) {
    const testOptions: TestOptions = {
      yomigana: false,
      numberOfQuestions: null,
      includedCards: null
    };
    const testOptionsFormGroup = this.fb.group(testOptions);
    const setsFormControl = this.fb.control(null);
    this.testFormGroup = this.fb.group({
      sets: setsFormControl,
      testOptions: testOptionsFormGroup
    });

    this.totalCards$ = setsFormControl.valueChanges.pipe(
      switchMap((sets: Set[]) => {
        return this.cardService.getCardCount$(sets.map((set) => set.Id));
      }),
      map((val) => (val ? val[0]['count'] : 0)),
      tap(() => {
        setTimeout(() =>
          testOptionsFormGroup.controls['numberOfQuestions'].setValue(
            testOptionsFormGroup.controls['numberOfQuestions'].value
          )
        );
      }),
      shareReplay(1)
    );
    this.attachValidators(this.testFormGroup.controls['testOptions'] as FormGroup);
  }

  ngOnInit() {
    this.supersets$ = this.supersetService.getSupersets$();
  }

  startTest() {
    this.testStarter
      .startTest(
        this.testFormGroup.controls['sets'].value,
        this.testFormGroup.controls['testOptions'].value
      )
      .subscribe();
  }

  clearSelectedSets() {
    this.testFormGroup.controls['sets'].setValue([]);
  }

  selectAllSets() {
    this.testFormGroup.controls['sets'].setValue(this.sets$.value);
  }

  showDescription(index: number) {
    this.hoveredIndex = index;
  }

  hideDescription() {
    this.hoveredIndex = -1;
  }

  private attachValidators(testOptionsFormGroup: FormGroup) {
    const MAX_CARDS = 60;
    const numberOfQuestionsValidator: AsyncValidatorFn = (control: FormControl) => {
      return this.totalCards$.pipe(
        map((totalCards) => {
          if (!control.value) {
            return { pleaseEnter: 'Please enter a number' };
          } else if (!control.value.match(/\D/)) {
            if (parseInt(control.value) > totalCards) {
              return { tooMany: 'Please enter numbers lower than the total' };
            } else if (parseInt(control.value) > MAX_CARDS) {
              return { tooMany: `Please enter a number below ${MAX_CARDS}` };
            }
            return null;
          } else {
            return { nonNumbericValue: 'Numbers only please' };
          }
        }),
        first()
      );
    };

    Object.keys(testOptionsFormGroup.controls).forEach((key) => {
      switch (key) {
        case 'numberOfQuestions':
          testOptionsFormGroup.controls[key].setAsyncValidators(numberOfQuestionsValidator);
          break;
      }
    });
  }
}
