import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestCollectionStoreService } from './services/test-collection-store.service';
import { AppRoutes } from './constants/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-maker';
}
