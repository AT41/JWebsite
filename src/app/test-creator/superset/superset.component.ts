import { Component, OnInit, Input } from '@angular/core';
import { Superset } from 'src/app/shared/services/backend-models';

@Component({
  selector: 'app-superset',
  templateUrl: './superset.component.html',
  styleUrls: ['./superset.component.scss']
})
export class SupersetComponent implements OnInit {
  @Input() superset: Superset;
  constructor() { }

  ngOnInit() {
  }

}
