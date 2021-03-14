import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CardService } from 'src/app/shared/services/cardService/card.service';
import { Set } from 'src/backend/backend-models';

export interface TestOptions {
  yomigana: boolean;
  numberOfQuestions: number;
  includedCards: number[];
}

@Component({
  selector: 'app-test-options',
  templateUrl: './test-options.component.html',
  styleUrls: ['./test-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestOptionsComponent implements OnInit {
  @Input() set setIds(setIds: Set[]) {
    this._setIds.next(setIds.map((set) => set.Id));
  }
  @Input() testOptionsFormGroup: FormGroup;
  public testOptionsFormGroup: FormGroup;
  public totalCards$: Observable<number>;

  private _setIds = new BehaviorSubject(null);

  constructor(private fb: FormBuilder, private CardService: CardService) {
    var initialValues: TestOptions = {
      yomigana: false,
      numberOfQuestions: null,
      includedCards: null
    };
    this.testOptionsFormGroup = this.buildForms(initialValues);
    this.totalCards$ = this._setIds.pipe(
      switchMap((setIds) => this.CardService.getCardCount$(setIds)),
      map((val) => val[0]['count'])
    );
  }

  ngOnInit(): void {}

  check() {
    setTimeout(() => console.log(this.testOptionsFormGroup.value));
  }

  private buildForms(initial: TestOptions): FormGroup {
    const numbersOnlyValidator: ValidatorFn = (control: FormControl) => {
      if (!control.value || !control.value.match(/\D/)) {
        return null;
      } else {
        return { nonNumbericValue: 'Numbers only please' };
      }
    };

    var asArrays = {};
    Object.keys(initial).forEach((key) => {
      asArrays[key] = [initial[key]];
      switch (key) {
        case 'numberOfQuestions':
          asArrays[key][1] = numbersOnlyValidator;
          break;
      }
    });

    return this.fb.group(asArrays);
  }
}
