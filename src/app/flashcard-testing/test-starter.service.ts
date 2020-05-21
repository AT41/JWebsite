import { Injectable } from '@angular/core';
import { Set, CardType, KanjiCard, Card } from '../shared/services/backend-models';
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
  constructor(private cardService: CardService, private router: Router) { }

  public startTest(sets: Set[], questionPrompt?: string): Observable<void> {
    return forkJoin(sets.map(
      set => sets.every(set1 => set1.CardType === CardType.kanji) ? 
        this.getKanjiCards(set)
        : this.getCards(set)
      )).pipe(map((testerCards: MainTesterCard[][]) => {
        this._mainTesterCards = shuffle(flatten(testerCards));
        this.router.navigate(['test']);
      }
    ));
  }

  private getKanjiCards(set: Set): Observable<MainTesterCard[]> {
    return this.cardService.getKanjiCards$(set.Id)
      .pipe(map((kanjiCards: KanjiCard[]) => 
        kanjiCards.map(kanjiCard => new MainTesterCard(kanjiCard.Kanji, kanjiCard.English, kanjiCard.Id))
    ));
  }

  private getCards(set: Set): Observable<MainTesterCard[]> {
    return this.cardService.getCards$(set.Id)
      .pipe(map((cards: Card[]) => 
        cards.map(card => new MainTesterCard(card.Kanji, card.Answer, card.Id))
    ));
  }
}
