import { Injectable } from '@angular/core';
import { Card, KanjiCard, Set } from '../../backend/backend-models';
import { CardService } from '../shared/services/cardService/card.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import flatten from 'lodash-es/flatten';
import shuffle from 'lodash-es/shuffle';
import { Router } from '@angular/router';
import { SetType } from '../shared/services/setService/set.service';

export class TestOptions {}

export class MainTesterCard {
  question: string;
  answer: string;
  cardId: number;

  public static cardObjectAnswerAttributeName: keyof KanjiCard | keyof Card;

  constructor(question: string, answer: string, cardId: number) {
    this.question = question;
    this.answer = answer; // TODO ANTHONY Consider getting these returned as hashed values from the backend
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
  constructor(private cardService: CardService, private router: Router) {}

  public startTest(
    sets: Set[],
    questionAttributeName?: keyof KanjiCard | keyof Card,
    answerAttributeName?: keyof KanjiCard | keyof Card,
    questionPrompt?: string,
    testOptions?: TestOptions
  ): Observable<void> {
    if (sets[0].CardType === SetType.kanji) {
      questionAttributeName = questionAttributeName || 'Kanji';
      answerAttributeName = answerAttributeName || 'English';
      MainTesterCard.cardObjectAnswerAttributeName = answerAttributeName;
    } else {
      questionAttributeName = questionAttributeName || 'Kanji';
      answerAttributeName = answerAttributeName || 'Answer';
      MainTesterCard.cardObjectAnswerAttributeName = answerAttributeName;
    }
    return forkJoin(
      sets.map((set) =>
        sets.every((set1) => set1.CardType === SetType.kanji)
          ? this.getKanjiCards(
              set,
              questionAttributeName as keyof KanjiCard,
              answerAttributeName as keyof KanjiCard
            )
          : this.getCards(
              set,
              questionAttributeName as keyof Card,
              answerAttributeName as keyof Card
            )
      )
    ).pipe(
      map((testerCards: MainTesterCard[][]) => {
        this._mainTesterCards = shuffle(flatten(testerCards));
        this.router.navigate(['test']);
      })
    );
  }

  private getKanjiCards(
    set: Set,
    questionAttributeName: keyof KanjiCard,
    answerAttributeName: keyof KanjiCard
  ): Observable<MainTesterCard[]> {
    return this.cardService
      .getKanjiCards$(set.Id)
      .pipe(
        map((kanjiCards: KanjiCard[]) =>
          kanjiCards.map(
            (kanjiCard) =>
              new MainTesterCard(
                kanjiCard[questionAttributeName as any],
                kanjiCard[answerAttributeName as any],
                kanjiCard.Id
              )
          )
        )
      );
  }

  private getCards(
    set: Set,
    questionAttributeName: keyof Card,
    answerAttributeName: keyof Card
  ): Observable<MainTesterCard[]> {
    return this.cardService
      .getCards$(set.Id)
      .pipe(
        map((cards: Card[]) =>
          cards.map(
            (card) =>
              new MainTesterCard(
                card[questionAttributeName as any],
                card[answerAttributeName as any],
                card.Id
              )
          )
        )
      );
  }
}
