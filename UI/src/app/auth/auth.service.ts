import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { UserAuth } from '../models/userAuth';



export interface AuthResData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<UserAuth>(null);

  constructor(private http: HttpClient) {}

  get user() {
    return this._user.asObservable();
  }

  get userIsAuth() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  // if expired, no userId will be available
  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  signup(emal: string, pwd: string) {
    console.log(emal, pwd);
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireApi}`,
        { email: emal, password: pwd, returnSecureToken: true }
      )
      .pipe(
        tap(userData => {
          const expiration = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          this._user.next(
            new UserAuth(
              userData.localId,
              userData.email,
              userData.idToken,
              expiration
            )
          );
        })
      );
  }

  login(emal: string, pwd: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireApi}`,
        { email: emal, password: pwd, returnSecureToken: true }
      )
      .pipe(
        tap(userData => {
          const expiration = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          this._user.next(
            new UserAuth(
              userData.localId,
              userData.email,
              userData.idToken,
              expiration
            )
          );
        })
      );
  }

  logout() {
    this._user.next(null);
  }
}
