import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../model/question';
import { QuestionOption } from '../../model/question-option';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-question-form',
  templateUrl: './new-question-form.component.html',
  styleUrls: ['./new-question-form.component.scss'],
})
export class NewQuestionFormComponent implements OnInit {
  @Input() question!: Question;
  @Output() onDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  markAsCorrect(uuid: string): void {
    this.question.correctAnswerUuid = uuid;
  }

  addAnswer(): void {
    let newOption: QuestionOption = {
      uuid: uuidv4(),
      description: '',
    };
    this.question.options.push(newOption);
    if (this.question.options.length === 1)
      this.question.correctAnswerUuid = newOption.uuid;
  }

  deleteAnswer(uuid: string): void {
    this.question.options = this.question.options.filter(
      (option) => option.uuid !== uuid
    );
    if(this.question.correctAnswerUuid == uuid) {
      this.question.correctAnswerUuid = this.question.options[0].uuid ?? undefined
    }
  }

  deleteQuestion(): void {
    this.onDelete.emit();
  }
}
