import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestCollectionStoreService } from './services/test-collection-store.service';
import { AppRoutes } from './constants/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-maker';

  constructor(
    private router: Router,
    private testCollectionStore: TestCollectionStoreService
  ) {}
  get testLoaded(): boolean {
    return this.testCollectionStore.currentTest !== undefined;
  }

  ngOnInit(): void {}

  navOptions = [
    {
      name: 'Collection',
      path: AppRoutes.TestCollection,
      enabled: true,
    },
    {
      name: 'Make Test',
      path: AppRoutes.MakeTest,
      enabled: true,
    },
  ];

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
