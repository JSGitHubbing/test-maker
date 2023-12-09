import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestCollectionStoreService {
  private _testCollection = new BehaviorSubject<Test[]>([]);
  private _selectedTest = new BehaviorSubject<Test | undefined>(undefined);

  get testCollection() {
    return this._testCollection.asObservable();
  }

  get currentTest() {
    return this._selectedTest.asObservable();
  }

  constructor() {}

  addTest(test: Test): void {
    const collection = this._testCollection.getValue();
    collection.push(test);
    this._testCollection.next(collection);
  }

  deleteTest(uuid: string): void {
    const collection = this._testCollection.getValue();
    const index = collection.findIndex((t) => t.uuid === uuid);
    collection.splice(index, 1);
    this._testCollection.next(collection);
  }

  selectTest(uuid: string): void {
    const collection = this._testCollection.getValue();
    this._selectedTest.next(collection.find((t) => t.uuid === uuid));
  }

  unselectTest(): void {
    this._selectedTest.next(undefined);
  }
}
