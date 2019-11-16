import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userId = 'u1';
  private _userIsAuth = false;


  constructor(private router: Router) {}

  get userIsAuth() {
    return this._userIsAuth;
  }

  get userId() {
    return this._userId;
  }

  login() {
    this._userIsAuth = true;
  }

  logout() {
    this._userIsAuth = false;
  }

}
