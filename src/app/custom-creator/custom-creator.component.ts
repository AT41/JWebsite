import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupersetService } from '../shared/services/supersetService/superset.service';
import { SetService } from '../shared/services/setService/set.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Superset, Set } from 'src/backend/backend-models';

@Component({
  selector: 'app-custom-creator',
  templateUrl: './custom-creator.component.html',
  styleUrls: ['./custom-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomCreatorComponent implements OnInit {
  protected supersets$: Observable<Superset[]>;
  protected sets$: Observable<Set[]>;

  protected readonly currentSuperset: BehaviorSubject<Superset> = new BehaviorSubject<Superset>(
    null
  );
  protected readonly currentSet: BehaviorSubject<Set> = new BehaviorSubject<Set>(null);

  constructor(private supersetService: SupersetService, private setService: SetService) {
    this.reset();
  }

  private reset() {
    this.supersets$ = this.supersetService.getSupersets$();
    this.sets$ = this.currentSuperset.pipe(
      switchMap((superset) => this.setService.getSets$(!!superset ? superset.Id : -1))
    );
  }

  ngOnInit() {}
}
