import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get user() {
    return this._user.asObservable();
  }

  get userIsAuth() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.approved;
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

  signup(emal: string, password: string, nam: string) {
    console.log(emal, password, nam);
    return this.http
      .post<User>(
        `http://localhost:3000/users/signup`, { email: emal, pwd: password, name: nam }
      )
      .pipe(
        tap(userData => {
          this._user.next(
            new User(
              userData.id,
              userData.name,
              userData.email,
              userData.pwd,
              userData.googleId,
              userData.approved,
              userData.imgUrl,
              userData.deleted
            )
          );
        })
      );
  }

  login(emal: string, password: string) {
    return this.http
      .post<User>(
        `http://localhost:3000/users/signin`, { email: emal, pwd: password },
      )
      .pipe(
        tap(userData => {
          this._user.next(
            new User(
              userData.id,
              userData.name,
              userData.email,
              userData.pwd,
              userData.googleId,
              userData.approved,
              userData.imgUrl,
              userData.deleted
            )
          );
        })
      );
  }

  logout() {
    this._user.next(null);
  }
}
