import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from 'src/app/api/user/user.service';
import { User } from 'src/app/model/user';
import { LocalStorageService } from '../local-storage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _onUserLogin = new BehaviorSubject<User | null>(null);
  private _onSignOut = new Subject();

  public get onUserLogin() {
    return this._onUserLogin.asObservable();
  }

  public get onSignOut() {
    return this._onSignOut.asObservable();
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService,
    private userService: UserService,
  ) {
    const currentUser = this.localStorageService.userSnapshot;
    if (currentUser?.uuid) this.setUserData(currentUser);
  }

  get isLoggedIn(): boolean {
    const user = this.localStorageService.user;
    return user !== null && user.emailVerified !== false ? true : false;
  }

  googleAuth() {
    return this.login(new GoogleAuthProvider());
  }

  login(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setUserData(user: any) {
    const userData: User = {
      uuid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    this.localStorageService.user = userData;
    this._onUserLogin.next(userData);
    this.userService
      .setUser(userData)
      .subscribe();
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.localStorageService.clear();
      this._onSignOut.next(true);
    });
  }
}
