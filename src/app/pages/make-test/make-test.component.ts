import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/routes';
import { Question } from 'src/app/model/question';
import { Test } from 'src/app/model/test';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-make-test',
  templateUrl: './make-test.component.html',
  styleUrls: ['./make-test.component.scss'],
})
export class MakeTestComponent implements OnInit {
  questions: Question[] = [];
  title: string = '';
  tags: string[] = [];

  constructor(
    private testCollectionStore: TestCollectionStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  newQuestion(): void {
    let question: Question = {
      uuid: uuidv4(),
      correctAnswerUuid: '0',
      options: [],
      title: '',
    };
    this.questions.push(question);
  }

  saveTest(): void {
    const test: Test = {
      uuid: uuidv4(),
      creationDate: new Date().toISOString(),
      questions: this.questions,
      tags: this.tags,
      title: this.title,
    };

    this.testCollectionStore.addTest(test);

    this.router.navigate([AppRoutes.TestCollection]);
  }
}
