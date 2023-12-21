import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from 'src/app/constants/routes';
import { Question } from 'src/app/model/question';
import { Test } from 'src/app/model/test';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store/test-collection-store.service';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.scss'],
})
export class TakeTestComponent implements OnInit {
  test!: Observable<Test | undefined>;
  results = new Map<Question, boolean>();

  get correctAnswers(): number {
    var correctNumber = 0;
    for (let value of this.results.values()) correctNumber += value ? 1 : 0;
    return correctNumber;
  }

  constructor(
    private testCollectionStore: TestCollectionStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.test = this.testCollectionStore.currentTest$;
    if (!this.testCollectionStore.hasTestSelected) this.router.navigate([AppRoutes.TestCollection]);
  }

  onResultQuestion(question: Question, correct: boolean): void {
    this.results.set(question, correct);
  }

  restartTest(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate([AppRoutes.TakeTest]))
  }
}
