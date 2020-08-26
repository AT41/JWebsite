import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { SetType } from '../../shared/services/setService/set.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card, KanjiCard } from '../../../backend/backend-models';

@Component({
  selector: 'app-test-options',
  templateUrl: './test-options.component.html',
  styleUrls: ['./test-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestOptionsComponent implements OnChanges {
  @Input() setType: string;

  public formGroup: FormGroup;
  public names: string[];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    const kanjiCard: KanjiCard = {
      SetId: null,
      English: null,
      Kanji: null,
      Kunyomi: null,
      Onyomi: null,
      CardOwner: null
    };
    const card: Card = {
      SetId: null,
      WordType: null,
      Kanji: null,
      Furigana: null,
      Answer: null,
      CardOwner: null
    };
    const allTests = {
      Randomize: null
    };
    console.log(this.setType);

    function mustContainOneQuestionOneAnswer(fg: FormGroup) {
      return Object.keys(fg.controls).some(
        (controlName) => fg.get(controlName).value === 'question'
      ) && Object.keys(fg.controls).some((controlName) => fg.get(controlName).value === 'answer')
        ? null
        : { needsAtLeastOneQuestionAndAnswer: true };
    }

    this.formGroup = this.fb.group(
      this.setType === SetType.kanji ? (kanjiCard as any) : (card as any)
    );
    this.formGroup.setValidators(mustContainOneQuestionOneAnswer);
    this.names = Object.keys(this.formGroup.controls);
  }
}
