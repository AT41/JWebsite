import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { SupersetService } from '../../shared/services/supersetService/superset.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SetService } from '../../shared/services/setService/set.service';
import { Superset, Set } from '../../../backend/backend-models';
import { TestStarterService } from 'src/app/flashcard-testing/test-starter.service';
import { MatButtonToggleGroup } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestOptions } from '../test-options/test-options.component';

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

  constructor(
    private supersetService: SupersetService,
    private setService: SetService,
    private testStarter: TestStarterService,
    private fb: FormBuilder
  ) {
    const testOptions: TestOptions = {
      yomigana: false,
      numberOfQuestions: null,
      includedCards: null
    };
    this.testFormGroup = this.fb.group({
      sets: null,
      testOptions: testOptions
    });
  }

  ngOnInit() {
    this.supersets$ = this.supersetService.getSupersets$();
  }

  startTest() {
    this.testStarter.startTest(this.testFormGroup.controls['sets'].value).subscribe();
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
}
