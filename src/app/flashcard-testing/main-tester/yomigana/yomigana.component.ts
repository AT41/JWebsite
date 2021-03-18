import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export class Yomigana {
  kanjiIndexStart: number;
  kanjiIndexEnd: number;
  characters: string;
}

class KanjiYomiganaDisplay {
  yomigana: string;
  ngStyle: any;
}

@Component({
  selector: 'app-yomigana',
  templateUrl: './yomigana.component.html',
  styleUrls: ['./yomigana.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YomiganaComponent implements OnInit {
  @Input() set kanji(kanji: string) {
    this.yomiganaDisplay = Array(kanji.length).map((val) => {
      return { yomigana: '', ngStyle: { 'min-width': '0' } };
    });
    this.kanjiString = kanji;
    this.initializeYomiganaSpacing();
  }
  @Input() yomigana?: Yomigana[];

  public yomiganaDisplay: KanjiYomiganaDisplay[];
  //public ngStyles: any[];

  public kanjiString: string;
  //public yomiganaArray: string[];
  constructor() {}

  ngOnInit(): void {}

  private initializeYomiganaSpacing() {
    var previousKanjiIndex = 0,
      currentKanjiIndex = 0;
    this.yomigana?.forEach((yomiganaChunk, index) => {
      for (var i = 0; i < yomiganaChunk.kanjiIndexStart - previousKanjiIndex; i++) {
        this.yomiganaDisplay[currentKanjiIndex++] = {
          ngStyle: { 'min-width': '2rem' },
          yomigana: ''
        };
      }
      this.yomiganaDisplay[currentKanjiIndex++] = {
        ngStyle: {
          'min-width': `${(yomiganaChunk.kanjiIndexEnd - yomiganaChunk.kanjiIndexStart) * 2}rem`
        },
        yomigana: yomiganaChunk.characters
      };
      for (var i = 0; i < yomiganaChunk.kanjiIndexEnd - yomiganaChunk.kanjiIndexStart; i++) {
        this.yomiganaDisplay[currentKanjiIndex++] = {
          ngStyle: { 'min-width': '0' },
          yomigana: ''
        };
      }
      previousKanjiIndex = yomiganaChunk.kanjiIndexEnd;
    });
  }
}
