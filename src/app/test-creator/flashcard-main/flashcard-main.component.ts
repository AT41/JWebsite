import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { SupersetService } from '../../shared/services/supersetService/superset.service';
import { Observable } from 'rxjs';
import { SetService } from '../../shared/services/setService/set.service';
import { Superset, Set } from '../../../backend/backend-models';
import remove from 'lodash-es/remove';
import { TestStarterService } from 'src/app/flashcard-testing/test-starter.service';
import { Router } from '@angular/router';
import { MatButtonToggleGroup } from '@angular/material';

@Component({
  selector: 'app-flashcard-main',
  templateUrl: './flashcard-main.component.html',
  styleUrls: ['./flashcard-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashcardMainComponent implements OnInit {
  public supersets$: Observable<Superset[]>;
  public sets$: Observable<Set[]>;
  public get currentSuperset(): Superset {
    return this._currentSuperset;
  }
  public set currentSuperset(superset: Superset) {
    this.sets$ = this.setService.getSets$(superset.Id);
    this._currentSuperset = superset;
  }
  private _currentSuperset: Superset;

  public selectedSets: Set[] = [];
  public hoveredIndex = -1;

  @ViewChild('sets', { read: MatButtonToggleGroup }) sets: MatButtonToggleGroup;

  constructor(
    private supersetService: SupersetService,
    private setService: SetService,
    private testStarter: TestStarterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.supersets$ = this.supersetService.getSupersets$();
  }

  selectSet(set: Set) {
    if (this.selectedSets.findIndex((selSet) => selSet.Id === set.Id) === -1) {
      this.selectedSets.push(set);
    } else {
      remove(this.selectedSets, (selSet) => selSet.Id === set.Id);
    }
  }

  startTest() {
    this.testStarter.startTest(this.selectedSets).subscribe();
  }

  clearSelectedSets() {
    this.sets._buttonToggles.forEach((toggle) => {
      if (toggle.checked === true) {
        this.selectSet(toggle.value);
        toggle.checked = false;
      }
    });
  }

  selectAllSets() {
    this.sets._buttonToggles.forEach((toggle) => {
      if (toggle.checked === false) {
        this.selectSet(toggle.value);
        toggle.checked = true;
      }
    });
  }

  showDescription(index: number) {
    this.hoveredIndex = index;
  }
  hideDescription() {
    this.hoveredIndex = -1;
  }
}
