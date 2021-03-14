import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn
} from '@angular/forms';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TestOptionsComponent)
    }
  ]
})
export class TestOptionsComponent implements OnInit, ControlValueAccessor {
  @Input() set setIds(setIds: Set[]) {
    this._setIds.next(setIds.map((set) => set.Id));
  }
  public testOptionsFormGroup: FormGroup;
  public totalCards$: Observable<number>;

  private _setIds = new BehaviorSubject(null);
  private _onBlur: any;

  constructor(private fb: FormBuilder, private CardService: CardService) {
    this.totalCards$ = this._setIds.pipe(
      switchMap((setIds) => this.CardService.getCardCount$(setIds)),
      map((val) => val[0]['count'])
    );
  }
  writeValue(obj: TestOptions): void {
    if (!this.testOptionsFormGroup) {
      this.testOptionsFormGroup = this.buildForms(obj);
    }
    this.testOptionsFormGroup.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.testOptionsFormGroup.valueChanges.subscribe((val) => fn(val));
  }
  registerOnTouched(fn: any): void {
    this._onBlur = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.testOptionsFormGroup.disable() : this.testOptionsFormGroup.enable();
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
