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
  // dummy chaning database
  private _users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get users() {
    return this._users.asObservable();
  }

  // po@po.com popopopo
  create(user: User) {
    return this.authService.userId.pipe(
      switchMap(userId => {
        console.log(user);
        user.id = userId;
        console.log(user);
        return this.http.put<{ name: string }>(
          `https://issho-7539b.firebaseio.com/users/${userId}.json`,
          {
            ...user
          }
        );
      }),
      switchMap(resData => {
        console.log(resData);
        return this.users;
      }),
      take(1),
      tap(users => {
        this._users.next(users.concat(user));
      })
    );
  }

  read() {
    return this.http
      .get<{ [key: string]: UserData }>(
        'https://issho-7539b.firebaseio.com/users.json'
      )
      .pipe(
        map(resData => {
          const users = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              users.push(new User(key, resData[key].email, resData[key].name));
            }
          }
          return users;
        }),
        tap(users => {
          this._users.next(users);
        })
      );
  }

  update(user: User) {
    let updatedUsers: User[];
    return this.users.pipe(
      take(1),
      switchMap(users => {
        const updatedId = users.findIndex(usr => usr.id === user.id);
        updatedUsers = [...users];
        updatedUsers[updatedId] = user;

        return this.http.put(
          `https://issho-7539b.firebaseio.com/users/${user.id}.json`,
          { ...updatedUsers[updatedId], id: null }
        );
      }),
      tap(() => {
        this._users.next(updatedUsers);
      })
    );
  }

  delete(userId: string) {
    return this.http
      .delete(`https://issho-7539b.firebaseio.com/users/${userId}.json`)
      .pipe(
        switchMap(() => {
          return this.users;
        }),
        take(1),
        tap(users => {
          this._users.next(users.filter(usr => usr.id !== userId));
        })
      );
  }

  getUser(userId: string) {
   /*
    return this.http
      .get<UserData>(`https://issho-7539b.firebaseio.com/users/${userId}.json`)*/
      return this.http.post('http://localhost:3000/users/signin', {email: 'sldssssdss@gmail.com', pwd: 'wtfwtf'}).pipe(
        map((resData: User) => {
          // let user: User;
          // user = new User(userId, resData.email, resData.name);
          console.log('resData', resData);
          // return new User(resData.id, resData.email, resData.name);
          const {id, email, name} = resData;
          return new User(id, email, name);
        })
      );
  }
}
