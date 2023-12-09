import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from './question-card/question-card.component';
import { QuestionListItemComponent } from './question-list-item/question-list-item.component';
import { NewQuestionFormComponent } from './new-question-form/new-question-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionCardComponent,
    QuestionListItemComponent,
    NewQuestionFormComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [QuestionCardComponent, NewQuestionFormComponent],
})
export class ComponentsModule {}
