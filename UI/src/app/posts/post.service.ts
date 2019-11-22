import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Crud } from '../crud';
import { HttpClient } from '@angular/common/http';

interface PostData {
  id: string;
  title: string;
  des: string;
  imgUrl: string;
  userId: string;
  date: Date;
  loc: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService implements Crud<Post[]> {
  private _posts = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) {}

  get posts() {
    return this._posts.asObservable();
  }

  create(post: Post) {
    let generatedId: string;
    return this.http
      .post<{ name: string }>('https://issho-7539b.firebaseio.com/posts.json', {
        ...post,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.posts;
        }),
        take(1),
        tap(posts => {
          post.id = generatedId;
          this._posts.next(posts.concat(post));
        })
      );
  }

  read() {
    return this.http
      .get<{ [key: string]: PostData }>(
        'https://issho-7539b.firebaseio.com/posts.json'
      )
      .pipe(
        map(resData => {
          const posts = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              posts.push(
                new Post(
                  key,
                  resData[key].title,
                  resData[key].des,
                  resData[key].imgUrl,
                  resData[key].userId,
                  new Date(resData[key].date),
                  resData[key].loc
                )
              );
            }
          }
          return posts;
        }),
        tap(posts => {
          this._posts.next(posts);
        })
      );
  }

  update(post: Post) {
    let updatedPosts: Post[];
    return this.posts.pipe(
      take(1),
      switchMap(posts => {

        const updatedId = posts.findIndex(pl => pl.id === post.id);
        updatedPosts = [...posts];
        updatedPosts[updatedId] = post;

        return this.http.put(
          `https://issho-7539b.firebaseio.com/posts/${post.id}.json`,
          { ...updatedPosts[updatedId], id: null }
        );
      }),
      tap(() => {
        this._posts.next(updatedPosts);
      })
    );
  }

  delete(postId: string) {
    return this.http
      .delete(`https://issho-7539b.firebaseio.com/posts/${postId}.json`)
      .pipe(
        switchMap(() => {
          return this.posts;
        }),
        take(1),
        tap(posts => {
          this._posts.next(posts.filter(p => p.id !== postId));
        })
      );
  }

  getPost(postId: string) {
    return this.http
      .get<PostData>(
        `https://issho-7539b.firebaseio.com/posts/${postId}.json`
      )
      .pipe(
        map(resData => {
          let post: Post;
          post = new Post(
                  postId,
                  resData.title,
                  resData.des,
                  resData.imgUrl,
                  resData.userId,
                  new Date(resData.date),
                  resData.loc
                );
          return post;
        })
      );
  }
}
