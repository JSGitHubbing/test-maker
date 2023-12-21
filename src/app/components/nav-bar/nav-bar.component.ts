import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppRoutes } from 'src/app/constants/routes';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store/test-collection-store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() title = '';

  public user: User | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private testCollectionStore: TestCollectionStoreService,
    private localStorage: LocalStorageService,
    public authService: AuthService
  ) {}

  get testLoaded(): boolean {
    return this.testCollectionStore.currentTest$ !== undefined;
  }

  ngOnInit(): void {
    const userSubscription = this.localStorage.user$.subscribe(
      (value) => (this.user = value)
    );
    this.subscriptions.push(userSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

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

  onLogin(): void {
    this.authService.googleAuth();
  }

  onLogOut(): void {
    this.authService.signOut();
  }
}
