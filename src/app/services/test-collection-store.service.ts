import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { BehaviorSubject } from 'rxjs';
import { JsonDownloadService } from './json-download.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TestCollectionStoreService {
  private _testCollection = new BehaviorSubject<Test[]>([]);
  private _selectedTest = new BehaviorSubject<Test | undefined>(undefined);
  private _testToEdit: Test | undefined = undefined;

  get testCollection() {
    return this._testCollection.asObservable();
  }

  get currentTest() {
    return this._selectedTest.asObservable();
  }

  get hasTestSelected() {
    return this._selectedTest.getValue() !== undefined;
  }

  constructor(
    private jsonDownload: JsonDownloadService,
    private localStorageService: LocalStorageService
  ) {
    this._testCollection.next(this.localStorageService.collection);
    this._testCollection.subscribe(
      (collection) => (this.localStorageService.collection = collection)
    );
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

  private findByUuid(uuid: string): Test | undefined {
    const collection = this._testCollection.getValue();
    return collection.find((t) => t.uuid === uuid);
  }

  private isNewerTest(testToCompare: Test, test: Test): boolean {
    const comparedTestDate = new Date(test.creationDate);
    const currentTestDate = new Date(testToCompare.creationDate);

    return currentTestDate <= comparedTestDate;
  }
}
