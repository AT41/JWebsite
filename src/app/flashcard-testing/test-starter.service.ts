import { Injectable } from '@angular/core';
import { Set, KanjiCard, Card } from '../../backend/backend-models';
import { CardService } from '../shared/services/cardService/card.service';
import { forkJoin, iif, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import flatten from 'lodash-es/flatten';
import shuffle from 'lodash-es/shuffle';
import { Router } from '@angular/router';

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
    questionPrompt?: string
  ): Observable<void> {
    if (sets[0].CardType === 'kanji') {
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
        this.getCards(set, questionAttributeName as keyof Card, answerAttributeName as keyof Card)
      )
    ).pipe(
      map((testerCards: MainTesterCard[][]) => {
        this._mainTesterCards = shuffle(flatten(testerCards));
        this.router.navigate(['test']);
      })
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
