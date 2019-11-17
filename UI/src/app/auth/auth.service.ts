import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _userId = 'u1';
  private _userIsAuth = true;


  constructor() {}

  get userIsAuth() {
    return this._userIsAuth;
  }

  get userId() {
    return this._userId;
  }

  login(userId: string) {
    console.log('login() auth');
    this._userId = userId;
    this._userIsAuth = true;
  }

  logout() {
    this._userIsAuth = false;
  }

}
