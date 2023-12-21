import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from 'src/app/model/entity';
import { Test } from 'src/app/model/test';
import { DatabaseService } from 'src/app/services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private collectionKey = 'collection';

  constructor(private databaseService: DatabaseService) {}

  getCollection(userUid: string): Observable<Test[] | undefined> {
    return this.databaseService.getByUid<Test[]>(userUid, this.collectionKey);
  }

  setCollection(
    userUid: string,
    collection: Test[]
  ): Observable<Entity | Entity[] | undefined> {
    return this.databaseService.set(
      `${this.collectionKey}/${userUid}`,
      collection
    );
  }
}
