import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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
    this.selected = selected;
    if (selected) {
      this.touched = true;
    }
  }

  public selected;
  public touched = false;

  constructor() {}

  ngOnInit() {}
}
