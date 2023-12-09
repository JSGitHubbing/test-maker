import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/routes';
import { Question } from 'src/app/model/question';
import { Test } from 'src/app/model/test';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store.service';
import { TestValidatorService } from 'src/app/services/test-validator.service';
import { v4 as uuidv4, validate } from 'uuid';

@Component({
  selector: 'app-make-test',
  templateUrl: './make-test.component.html',
  styleUrls: ['./make-test.component.scss'],
})
export class MakeTestComponent implements OnInit {
  test: Test = {
    creationDate: '',
    questions: [],
    tags: [],
    title: '',
    uuid: uuidv4(),
    hasChanges: false,
  };

  private isEdition = false;

  constructor(
    private testCollectionStore: TestCollectionStoreService,
    private router: Router,
    private testValidator: TestValidatorService
  ) {}

  ngOnInit(): void {
    const editTest = this.testCollectionStore.getEditTest();
    this.testCollectionStore.clearTestToEdit();
    if (editTest) {
      this.test = { ...editTest };
      this.isEdition = true;
    }
  }

  newQuestion(): void {
    let question: Question = {
      uuid: uuidv4(),
      correctAnswerUuid: '0',
      options: [],
      title: '',
    };
    this.test.questions.push(question);
  }

  saveTest(): void {
    const validationErrors = this.testValidator.validateTest(this.test);
    if (validationErrors.length) {
      alert(validationErrors.join('\n'));
      return;
    }

    this.test.creationDate = new Date().toISOString();
    if (this.isEdition) {
      this.test.hasChanges = true;
      this.testCollectionStore.updateTest(this.test);
    } else {
      this.testCollectionStore.addTest(this.test);
    }
    this.router.navigate([AppRoutes.TestCollection]);
  }

  deleteQuestion(uuid: string): void {
    this.test.questions = this.test.questions.filter(
      (question) => question.uuid !== uuid
    );
  }
}
