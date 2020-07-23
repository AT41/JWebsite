import { Injectable } from '@angular/core';

@Injectable()
export class QuestionMarkerService {
  public isGuessCorrect(guess: string, answer: string): boolean {
    return answer
      .split(/[;|]/)
      .some((ans) => ans.toLowerCase().trim() === guess.toLowerCase().trim());
  }

  constructor() {}
}
