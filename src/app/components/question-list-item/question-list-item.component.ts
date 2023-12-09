import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../model/question';

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.scss'],
})
export class QuestionListItemComponent implements OnInit {
  @Input() question!: Question;

  constructor() {}

  ngOnInit(): void {}
}
