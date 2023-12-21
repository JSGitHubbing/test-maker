import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollectionService } from 'src/app/api/collection/collection.service';
import { Test } from 'src/app/model/test';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth/auth.service';
import { JsonDownloadService } from '../json-download/json-download.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TestCollectionStoreService {
  private _testCollection = new BehaviorSubject<Test[]>([]);
  private _selectedTest = new BehaviorSubject<Test | undefined>(undefined);
  private _testToEdit: Test | undefined = undefined;

  get testCollection$() {
    return this._testCollection.asObservable();
  }

  get currentTest$() {
    return this._selectedTest.asObservable();
  }

  get hasTestSelected() {
    return this._selectedTest.getValue() !== undefined;
  }

  constructor(
    private jsonDownload: JsonDownloadService,
    private localStorageService: LocalStorageService,
    private collectionService: CollectionService,
    private authService: AuthService
  ) {
    this._testCollection.next(this.localStorageService.collection);
    this._testCollection.subscribe((collection) => {
      this.localStorageService.collection = collection;
      this.updateRemoteCollection();
    });
    this.authService.onUserLogin.subscribe((user) => {
      if (user) this.loadRemoteData(user);
      else this.clearCollection();
    });
    this.authService.onSignOut.subscribe((value) => value && this.clear());
  }

  setEditTest(test: Test): void {
    this._testToEdit = test;
  }

  clearTestToEdit(): void {
    this._testToEdit = undefined;
  }

  getEditTest(): Test | undefined {
    return this._testToEdit;
  }

  addTest(test: Test): void {
    const collection = this._testCollection.getValue();
    const existingTest = this.findByUuid(test.uuid);
    if (!existingTest) collection.push(test);
    else if (this.isNewerTest(test, existingTest)) this.updateTest(test);
    this._testCollection.next(collection);
  }

  deleteTest(uuid: string): void {
    const collection = this._testCollection.getValue();
    const index = collection.findIndex((t) => t.uuid === uuid);
    collection.splice(index, 1);
    this._testCollection.next(collection);
  }

  selectTest(uuid: string): void {
    const test = this.findByUuid(uuid);
    this._selectedTest.next(test);
  }

  unselectTest(): void {
    this._selectedTest.next(undefined);
  }

  updateTest(test: Test): void {
    const collection = this._testCollection.getValue();
    const index = collection.findIndex((t) => t.uuid === test.uuid);
    collection.splice(index, 1, test);
    this._testCollection.next(collection);
  }

  downloadJson(uuid: string): void {
    const test = this.findByUuid(uuid);
    if (test) {
      test.hasChanges = false;
      this.jsonDownload.downloadObjectAsJson(test, test.title);
    }
  }

  clear(): void {
    this.clearCollection();
    this.clearTestToEdit();
    this._selectedTest.next(undefined);
  }

  private findByUuid(uuid: string): Test | undefined {
    const collection = this._testCollection.getValue();
    return collection.find((t) => t.uuid === uuid);
  }

  private isNewerTest(testToCompare: Test, test: Test): boolean {
    const comparedTestDate = new Date(test.creationDate);
    const currentTestDate = new Date(testToCompare.creationDate);

    return currentTestDate <= comparedTestDate;
  }

  private updateRemoteCollection(): void {
    if (this.localStorageService.userUuid)
      this.collectionService.setCollection(
        this.localStorageService.userUuid,
        this._testCollection.getValue()
      );
  }

  private loadRemoteData(user: User): void {
    this.collectionService.getCollection(user.uuid).subscribe((value) => {
      if (value)
        this._testCollection.next(
          Object.entries(value).map(([key, value]) => value)
        );
    });
  }

  private clearCollection(): void {
    this._testCollection.next([]);
  }
}
