import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export class Yomigana {
  kanjiIndex: number;
  characters: string;
}

@Component({
  selector: 'app-yomigana',
  templateUrl: './yomigana.component.html',
  styleUrls: ['./yomigana.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YomiganaComponent implements OnInit {
  @Input() kanji: string;
  @Input() yomigana: Yomigana[];
  constructor() {}

  ngOnInit(): void {}
}
