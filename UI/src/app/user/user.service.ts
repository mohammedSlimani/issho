import { Injectable } from '@angular/core';
import { Crud } from '../crud';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Crud<User[]> {
  private _users = new BehaviorSubject<User[]>([
    new User('u1', 'm@m', 'mamamama', 'mouhcine'),
    new User('u2', 'm@m2', 'mamamama', 'mouh'),
    new User('u3', 'm@m2', 'mamamama', 'toumi')
  ]);

  constructor() {}

  create(user: User) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(users => {
        this._users.next(users.concat(user));
      })
    );
  }

  read() {
    return this._users.asObservable();
  }

  update(user: User) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(users => {
        const updatedId = users.findIndex(usr => usr.id === usr.id);
        const updatedUsers = [...users];
        updatedUsers[updatedId] = user;
        this._users.next(updatedUsers);
      })
    );
  }

  delete(userId: string) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(users => {
        const updatedUsers = [...users];
        updatedUsers.filter(usr => usr.id === userId);
        this._users.next(updatedUsers.filter(usr => usr.id !== userId));
      })
    );
  }

  getUser(userId: string) {
    return this.read().pipe(
      take(1),
      map(users => {
        return { ...users.find(usr => usr.id === userId) };
      })
    );
  }

  verifyLogin(email: string, pwd: string) {
    console.log('verifyLogin()');
    return this.read().pipe(
      take(1),
      map(users => {
        console.log(email, pwd);
        return { ...users.find(usr => usr.email === email && usr.pwd === pwd) };
      })
    );
  }

  verifySignup(email: string) {
    console.log('verifySignup()');
    return this.read().pipe(
      take(1),
      map(users => {
        console.log(email);
        return { ...users.find(usr => usr.email === email) };
      })
    );
  }
}
