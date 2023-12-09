import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionOption } from '../../model/question-option';
import { Question } from '../../model/question';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: Question;
  @Input() autocorrect: boolean = true;
  @Output() onSelectedOption = new EventEmitter<QuestionOption | undefined>();
  @Output() onResult = new EventEmitter<boolean>();

  currentSelected?: QuestionOption;
  correct: boolean = false;

  private blockComponent = false;

  constructor() {}

  ngOnInit(): void {}

  selectedOption(value: QuestionOption): void {
    if (this.blockComponent) return;

    this.currentSelected = this.currentSelected === value ? undefined : value;
    this.onSelectedOption.emit(value);

    if (this.autocorrect) {
      this.correct = true;
      this.blockComponent = true;
    }

    if (this.correct)
      this.onResult.emit(
        this.question.correctAnswerUuid === this.currentSelected?.uuid
      );
  }
}
