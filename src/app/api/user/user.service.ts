import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Entity } from 'src/app/model/entity';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userKey = 'users';

  constructor(private databaseService: DatabaseService) {}

  getUser(userUid: string): Observable<User | undefined> {
    return this.databaseService.getByUid<User>(userUid, this.userKey);
  }

  setUser(user: User): Observable<Entity | Entity[] | undefined> {
    return this.databaseService.set(`${this.userKey}/${user.uuid}`, user);
  }
}
