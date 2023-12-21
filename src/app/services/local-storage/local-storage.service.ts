import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Test } from 'src/app/model/test';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private static CollectionKey = 'test_collection';
  private static UserKey = 'user';

  private _user = new BehaviorSubject<User | null>(null);

  public get user$() {
    return this._user.asObservable();
  }

  constructor() {}

  get collection(): Test[] {
    const serializedData = localStorage.getItem(
      LocalStorageService.CollectionKey
    );
    if (!serializedData) return [];
    return JSON.parse(serializedData);
  }

  set collection(collection: Test[]) {
    this.setItem(LocalStorageService.CollectionKey, collection);
  }

  get userSnapshot(): User | null {
    const userString = localStorage.getItem(LocalStorageService.UserKey);
    return userString ? JSON.parse(userString) : null;
  }

  get userUuid(): string | undefined {
    return this.userSnapshot?.uuid;
  }

  set user(value: User | null) {
    if (!value) {
      this.removeUser();
      return;
    }
    this.setItem(LocalStorageService.UserKey, value);
    this._user.next(value);
  }

  public removeUser(): void {
    localStorage.removeItem(LocalStorageService.UserKey);
    this._user.next(null);
  }

  private clearCollection(): void {
    localStorage.removeItem(LocalStorageService.CollectionKey);
  }

  public clear(): void {
    this.removeUser();
    this.clearCollection();
  }

  private setItem(key: string, value: any) {
    const parsedData: string = JSON.stringify(value);
    localStorage.setItem(key, parsedData);
  }
}
