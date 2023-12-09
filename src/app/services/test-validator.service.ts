import { Injectable } from '@angular/core';
import { Test } from '../model/test';

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
    else
      test.questions.forEach((question, index) => {
        if (!question.title)
          errors.push(`La pregunta ${index + 1} debe tener un título`);
        if (!question.options.length || question.options.length < 2)
          errors.push(
            `La pregunta ${index + 1} debe tener al menos dos respuestas`
          );
        else
          question.options.forEach((option, indexOption) => {
            if (!option.description)
              errors.push(
                `La respuesta ${indexOption + 1} de la pregunta ${
                  index + 1
                } debe tener un título`
              );
          });
        if (!question.correctAnswerUuid)
          errors.push(
            `La pregunta ${index + 1} debe tener una respuesta correcta`
          );
      });

    return errors;
  }
}
