import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Superset } from '../../../backend/backend-models';

@Component({
  selector: 'app-superset',
  templateUrl: './superset.component.html',
  styleUrls: ['./superset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupersetComponent implements OnInit {
  @Input() superset: Superset;
  @Input() set isSelected(selected: boolean) {
    this.selectedEmitter.next(selected);
    if (selected) {
      this.touched = true;
    }
  }

  private selectedEmitter = new BehaviorSubject<boolean>(false);
  public selected$ = this.selectedEmitter.pipe(
    throttleTime(500, undefined, { leading: true, trailing: true })
  );
  public touched = false;

  constructor() {}

  ngOnInit() {}
}
