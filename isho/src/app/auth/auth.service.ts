import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userId = 'u1';

  constructor() { }

  get userId(){
    return this._userId;
  }

}
