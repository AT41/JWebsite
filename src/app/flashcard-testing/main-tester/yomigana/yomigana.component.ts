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
    this.yomiganaDisplay = Array(kanji.length)
      .fill({})
      .map((_) => {
        return { yomigana: '', ngStyle: { 'min-width': '0' } };
      });
    this.kanjiString = kanji;
    this.initializeYomiganaSpacing();
  }
  @Input() yomigana?: Yomigana[];

  public yomiganaDisplay: KanjiYomiganaDisplay[];

  public kanjiString: string;
  constructor() {}

  ngOnInit(): void {}

  private initializeYomiganaSpacing() {
    var previousKanjiIndex = 0,
      currentKanjiIndex = 0;
    this.yomigana?.forEach((yomiganaChunk) => {
      for (var i = 0; i < yomiganaChunk.kanjiIndexStart - previousKanjiIndex; i++) {
        this.yomiganaDisplay[currentKanjiIndex++] = {
          ngStyle: { 'min-width': '2em' },
          yomigana: ''
        };
      }
      this.yomiganaDisplay[currentKanjiIndex++] = {
        ngStyle: {
          'min-width': `${(yomiganaChunk.kanjiIndexEnd - yomiganaChunk.kanjiIndexStart) * 2}em`
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
