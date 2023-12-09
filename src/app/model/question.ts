import { QuestionOption } from './question-option';

export interface Question {
  uuid: string;
  title: string;
  options: QuestionOption[];
  correctAnswerUuid: string;
}
