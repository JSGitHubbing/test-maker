import { Injectable } from '@angular/core';
import { EILSEQ } from 'constants';
import { Question } from 'src/app/model/question';
import { QuestionOption } from 'src/app/model/question-option';
import { Test } from 'src/app/model/test';

@Injectable({
  providedIn: 'root',
})
export class TestValidatorService {
  constructor() {}

  validateTest(test: Test): string[] {
    const errors = [];

    if (!test.title) errors.push('El título es obligatorio');
    if (!test.questions.length)
      errors.push('El test debe contener al menos una pregunta');
    else errors.push(...this.validateQuestionList(test.questions));

    return errors;
  }

  private validateQuestionList(questionList: Question[]): string[] {
    const errors: string[] = [];
    questionList.forEach((question, indexQuestion) => {
      errors.push(...this.validateQuestion(question, indexQuestion));
    });
    return errors;
  }

  private validateQuestion(
    question: Question,
    indexQuestion: number
  ): string[] {
    const errors: string[] = [];
    if (!question.title)
      errors.push(`La pregunta ${indexQuestion + 1} debe tener un título`);
    if (!question.options.length || question.options.length < 2)
      errors.push(
        `La pregunta ${indexQuestion + 1} debe tener al menos dos respuestas`
      );
    else
      errors.push(
        ...this.validateQuestionOptionList(question.options, indexQuestion)
      );
    if (!question.correctAnswerUuid)
      errors.push(
        `La pregunta ${indexQuestion + 1} debe tener una respuesta correcta`
      );
    return errors;
  }

  private validateQuestionOptionList(
    questionOptionList: QuestionOption[],
    indexQuestion: number
  ): string[] {
    const errors: string[] = [];
    questionOptionList.forEach((question, indexOption) => {
      errors.push(
        ...this.validateQuestionOption(question, indexOption, indexQuestion)
      );
    });
    return errors;
  }

  private validateQuestionOption(
    option: QuestionOption,
    indexOption: number,
    indexQuestion: number
  ): string[] {
    const errors: string[] = [];
    if (!option.description)
      errors.push(
        `La respuesta ${indexOption + 1} de la pregunta ${
          indexQuestion + 1
        } debe tener un título`
      );
    return errors;
  }
}
