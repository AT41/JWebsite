import { Injectable } from '@angular/core';
import { Set, Card } from '../../backend/backend-models';
import { CardService } from '../shared/services/cardService/card.service';
import { forkJoin, iif, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import flatten from 'lodash-es/flatten';
import shuffle from 'lodash-es/shuffle';
import { Router } from '@angular/router';
import { EnglishdefinitionService } from '../shared/services/englishdefinitionService/englishdefinition.service';

export class MainTesterCard {
  question: string;
  answer: string;
  cardId: number;

  public static cardObjectAnswerAttributeName: keyof Card;

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
  constructor(
    private cardService: CardService,
    private englishdefinitionService: EnglishdefinitionService,
    private router: Router
  ) {}

  public startTest(
    sets: Set[],
    questionAttributeName?: keyof Card,
    answerAttributeName?: keyof Card,
    questionPrompt?: string
  ): Observable<void> {
    questionAttributeName = questionAttributeName || 'Kanji';
    MainTesterCard.cardObjectAnswerAttributeName = answerAttributeName || 'Furigana';

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
    this;
    return this.cardService.getCards$(set.Id).pipe(
      switchMap((cards: Card[]) => this.englishdefinitionService.getDefinitionsForCards$(cards)),
      map((cardsAndDefinitions) =>
        cardsAndDefinitions.map(
          (cardAndDefinition) =>
            new MainTesterCard(
              cardAndDefinition.card[questionAttributeName as any],
              cardAndDefinition.card[answerAttributeName as any] ||
                cardAndDefinition.definitions.join(';'),
              cardAndDefinition.card.Id
            )
        )
      )
    );
  }
}
