import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from 'src/app/constants/routes';
import { Test } from 'src/app/model/test';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store.service';

@Component({
  selector: 'app-load-test',
  templateUrl: './load-test.component.html',
  styleUrls: ['./load-test.component.scss'],
})
export class LoadTestComponent implements OnInit {
  testCollection!: Observable<Test[]>;

  constructor(
    private testCollectionStore: TestCollectionStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testCollection = this.testCollectionStore.testCollection;
  }

  takeTest(uuid: string): void {
    this.testCollectionStore.selectTest(uuid);
    this.router.navigate([AppRoutes.TakeTest]);
  }

  editTest(uuid: string): void {
    this.testCollectionStore.selectTest(uuid);
    this.router.navigate([AppRoutes.MakeTest]);
  }

  deleteTest(uuid: string): void {
    this.testCollectionStore.deleteTest(uuid);
  }
}
