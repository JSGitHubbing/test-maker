import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from './question-card/question-card.component';
import { QuestionListItemComponent } from './question-list-item/question-list-item.component';
import { NewQuestionFormComponent } from './new-question-form/new-question-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../modules/icons/icons.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    QuestionCardComponent,
    QuestionListItemComponent,
    NewQuestionFormComponent,
    NavBarComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule],
  exports: [QuestionCardComponent, NewQuestionFormComponent, NavBarComponent],
})
export class ComponentsModule {}
