import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {
  AsyncValidatorFn,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn
} from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  debounce,
  debounceTime,
  first,
  map,
  shareReplay,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { CardService } from 'src/app/shared/services/cardService/card.service';
import { Set } from 'src/backend/backend-models';
import { TestOptions } from '../flashcard-main/flashcard-main.component';

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
export class TestOptionsComponent implements OnInit {
  @Input() totalCards: number;
  @Input() formGroup: FormGroup;

  public testOptionsFormGroup: FormGroup;

  private _onBlur: any;

  constructor(
    private fb: FormBuilder,
    private CardService: CardService,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  getError(): string | null {
    const errors = this.formGroup.controls['numberOfQuestions'].errors;
    return errors ? errors[Object.keys(errors)[0]] : null;
  }
}
