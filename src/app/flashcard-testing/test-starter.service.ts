import { Injectable } from '@angular/core';
import { Set, Card, Englishdefinition } from '../../backend/backend-models';
import { CardService } from '../shared/services/cardService/card.service';
import { forkJoin, iif, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import flatten from 'lodash-es/flatten';
import shuffle from 'lodash-es/shuffle';
import { Router } from '@angular/router';
import { EnglishdefinitionService } from '../shared/services/englishdefinitionService/englishdefinition.service';

export class MainTesterCard {
  question: string;
  answers: string[];
  cardId: number;

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
    questionAttributeName?: keyof Card | keyof Englishdefinition,
    answerAttributeName?: keyof Card | keyof Englishdefinition,
    questionPrompt?: string
  ): Observable<void> {
    questionAttributeName = questionAttributeName || 'Kanji';
    MainTesterCard.cardObjectAnswerAttributeName = answerAttributeName || 'Definition';

    return forkJoin(
      sets.map((set) =>
        this.getCards(set, questionAttributeName, MainTesterCard.cardObjectAnswerAttributeName)
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
    questionAttributeName: keyof Card | keyof Englishdefinition,
    answerAttributeName: keyof Card | keyof Englishdefinition
  ): Observable<MainTesterCard[]> {
    return this.cardService.getCards$(set.Id).pipe(
      switchMap((cards: Card[]) =>
        answerAttributeName === 'Definition' || questionAttributeName === 'Definition'
          ? this.englishdefinitionService.getDefinitionsForCards$(cards)
          : of(cards)
      ),
      map((cardsAndOrDefinitions) =>
        cardsAndOrDefinitions.map(
          (cardsAndOrDefinition) =>
            new MainTesterCard(
              cardsAndOrDefinition[questionAttributeName],
              cardsAndOrDefinition[answerAttributeName].split(';'),
              cardsAndOrDefinition.Id
            )
        )
      )
    );
  }
}
