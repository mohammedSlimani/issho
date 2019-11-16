import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _userId = 'u1';
  private _userIsAuth = true;


  constructor(
    private router: Router,
    private userService: UserService) {}

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
