import { Question } from './question';

export interface Test {
  uuid: string;
  title: string;
  questions: Question[];
  creationDate: string;
  tags: string[];
}
