import { Entity } from './entity';
import { Question } from './question';

export interface Test extends Entity {
  title: string;
  questions: Question[];
  creationDate: string;
  tags: string[];
  hasChanges?: boolean;
}
