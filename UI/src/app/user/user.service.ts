import { Injectable } from '@angular/core';
import { Crud } from '../crud';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

export interface UserData {
  id: string;
  email: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService implements Crud<User[]> {

  private _users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get users() {
    return this._users.asObservable();
  }

  // this service doesn't create users anymore
  // authService does
  create(user: User) {
    return this.users;
  }

  // not necessary for now
  read() {
    return this._users;
  }

  // you cant leave us :)
  delete(userId: string) {
    return this._users;
  }



  update(user: User) {
    return this.users;
  }

  getUser(userId: string) {
    // for now returns my account data
    return this.authService.user;

    /*
      return this.http
        .post<User>('http://localhost:3000/users/signin', {pwd: 'hellobae', email: 'mouhcined@gmail.com'})
        .pipe(
          map((resData) => {
            console.log('resData', resData);
            return new User(resData.id, resData.name, resData.email);
          })
        );
      */
  }
}
