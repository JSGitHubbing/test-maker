import { Injectable } from '@angular/core';
import { Test } from '../model/test';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static CollectionKey = 'test_collection';

  constructor() {}

  get collection(): Test[] {
    const serializedData = localStorage.getItem(
      LocalStorageService.CollectionKey
    );
    if (!serializedData) return [];
    const parsedData: Test[] = JSON.parse(serializedData);
    return parsedData;
  }

  set collection(collection: Test[]) {
    const parsedData: string = JSON.stringify(collection);
    localStorage.setItem(LocalStorageService.CollectionKey, parsedData);
  }
}
