import { Injectable } from '@angular/core';
import { get, getDatabase, ref, set } from 'firebase/database';
import { Observable, from } from 'rxjs';
import { Entity } from 'src/app/model/entity';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  set<T>(
    table: string,
    entity: Entity | Entity[]
  ): Observable<Entity | Entity[] | undefined> {
    const myRef = this.getRef(`${table}`);
    const promise = set(myRef, entity).then(
      (_) => entity,
      (reason) => {
        console.error(reason);
        return undefined;
      }
    );

    return from(promise);
  }

  getValues<T>(table: string): Observable<T[]> {
    const myRef = this.getRef(table);

    const result: T[] = [];
    const promise = get(myRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        result.push(doc.val());
      });
      return result;
    });

    return from(promise);
  }

  get<T>(table: string): Observable<T[]> {
    const myRef = this.getRef(table);
    const result: T[] = [];
    const promise = get(myRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        result.push({ uid: doc.key, ...doc.val() });
      });
      return result;
    });

    return from(promise);
  }

  getByUid<T>(uid: string, table: string): Observable<T | undefined> {
    const myRef = this.getRef(`${table}/${uid}`);
    const promise: Promise<T | undefined> = get(myRef).then((c) => {
      const character: T = { ...c.val() };
      return character;
    });
    return from(promise);
  }

  private getRef(table: string) {
    const db = getDatabase();
    return ref(db, table);
  }
}
