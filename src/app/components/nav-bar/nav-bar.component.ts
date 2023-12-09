import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/routes';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
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
      name: 'Colección',
      path: AppRoutes.TestCollection,
      enabled: true,
    },
    {
      name: 'Crear test',
      path: AppRoutes.MakeTest,
      enabled: true,
    },
  ];

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
