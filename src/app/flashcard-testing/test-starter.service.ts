import { Injectable } from '@angular/core';
import { Set, Card, Englishdefinition } from '../../backend/backend-models';
import { CardService } from '../shared/services/cardService/card.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import shuffle from 'lodash-es/shuffle';
import { Router } from '@angular/router';
import { EnglishdefinitionService } from '../shared/services/englishdefinitionService/englishdefinition.service';
import { TestOptions } from '../test-creator/flashcard-main/flashcard-main.component';
import { Yomigana } from './main-tester/yomigana/yomigana.component';

export class MainTesterCard {
  question: string;
  answers: string[];
  cardId: number;
  yomigana?: Yomigana[];
  public static cardObjectAnswerAttributeName: keyof Card | keyof Englishdefinition;

  constructor(question: string, answer: string[], cardId: number) {
    this.question = question;
    this.answers = answer; // TODO ANTHONY Consider getting these returned as hashed values from the backend
    this.cardId = cardId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TestStarterService {
  private _mainTesterCards: MainTesterCard[];
  public get mainTesterCards(): MainTesterCard[] {
    return this._mainTesterCards;
  }
  constructor(
    private cardService: CardService,
    private englishdefinitionService: EnglishdefinitionService,
    private router: Router
  ) {}

  public startTest(
    sets: Set[],
    testOptions: TestOptions,
    questionAttributeName?: keyof Card | keyof Englishdefinition,
    answerAttributeName?: keyof Card | keyof Englishdefinition,
    questionPrompt?: string
  ): Observable<void> {
    questionAttributeName = questionAttributeName || 'Kanji';
    MainTesterCard.cardObjectAnswerAttributeName = answerAttributeName || 'Definition';

    return this.getCards$(
      sets,
      testOptions,
      questionAttributeName,
      MainTesterCard.cardObjectAnswerAttributeName
    ).pipe(
      map((testerCards: MainTesterCard[]) => {
        this._mainTesterCards = shuffle(testerCards);
        this.router.navigate(['test']);
      })
    );
  }

  private getCards$(
    sets: Set[],
    testOptions: TestOptions,
    questionAttributeName: keyof Card | keyof Englishdefinition,
    answerAttributeName: keyof Card | keyof Englishdefinition
  ): Observable<MainTesterCard[]> {
    const setIds = sets.map((set) => set.Id);
    return this.cardService.getCards$(setIds, testOptions).pipe(
      switchMap((cards: Card[]) =>
        answerAttributeName === 'Definition' || questionAttributeName === 'Definition'
          ? this.englishdefinitionService.getDefinitionsForCards$(cards)
          : of(cards)
      ),
      map((cardsAndOrDefinitions) =>
        cardsAndOrDefinitions.map((cardsAndOrDefinition) => {
          var mainTesterCard = new MainTesterCard(
            cardsAndOrDefinition[questionAttributeName],
            cardsAndOrDefinition[answerAttributeName].split(';'),
            cardsAndOrDefinition.Id
          );
          if (testOptions.yomigana) {
            mainTesterCard.yomigana = this.calculateYomigana(
              cardsAndOrDefinition.Furigana,
              cardsAndOrDefinition.Kanji
            );
          }
          return mainTesterCard;
        })
      )
    );
  }

  private calculateYomigana(furigana: string, kanji: string): Yomigana[] {
    var yomigana: Yomigana[] = [];
    var furiganaIndexStart = 0;
    for (var i = 0; i < kanji.length; i++) {
      while (kanji[i] === furigana[furiganaIndexStart] && i < kanji.length) {
        i++;
        furiganaIndexStart++;
      }
      if (i < kanji.length) {
        const kanjiIndexStart = i;
        while (
          i < kanji.length &&
          furigana.indexOf(kanji[i], furiganaIndexStart + (i - kanjiIndexStart)) === -1
        ) {
          i++;
        }
        const furiganaIndexEnd =
          i === kanji.length
            ? furigana.length
            : furigana.indexOf(kanji[i], furiganaIndexStart + (i - kanjiIndexStart));
        const kanjiIndexEnd = i;
        yomigana.push({
          kanjiIndexEnd: kanjiIndexEnd,
          kanjiIndexStart: kanjiIndexStart,
          characters: furigana.slice(furiganaIndexStart, furiganaIndexEnd)
        });
        furiganaIndexStart = furiganaIndexEnd + 1;
      }
    }
    return yomigana;
  }
}
