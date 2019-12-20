import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Crud } from '../crud';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

interface PostData {
  id: string;
  title: string;
  des: string;
  userId: string;
  imgUrl: string;
  date: Date;
  loc: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService implements Crud<Post[]> {
  private _posts = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get posts() {
    return this._posts.asObservable();
  }

  create(post: Post) {
    // using the latest userId ( example )
    let generatedId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('no user found');
        }
        post.authorId = userId;
        return this.http.post<Post>(
          'http://localhost:3000/posts',
          {
            authorId: post.authorId,
            title: post.title,
            des: post.des
          }
        );
      }),
      switchMap(resData => {
        generatedId = resData.id;
        console.log(generatedId);
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
      .get<Post>('http://localhost:3000/posts')
      .pipe(
        map(resData => {
          const posts = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              posts.push(
                new Post(
                  resData[key].id,
                  resData[key].title,
                  resData[key].des,
                  resData[key].imgUrl,
                  resData[key].authorId,
                  new Date(),
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
        console.log( 'to be sent : ', post);
        return this.http.patch<Post>(
          `http://localhost:3000/posts/${post.id}`,
          {
            authorId: post.authorId,
            title: post.title,
            des: post.des,
            id: post.id}
        );
      }),
      tap(() => {
        console.log(updatedPosts);
        this._posts.next(updatedPosts);
      })
    );
  }

  delete(postId: string) {
    return this.authService.userId.pipe(
      take(1),
      switchMap( userId => {
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          }),
          body: { id: postId, authorId: userId }
        };
        // still need to send something
        return this.http
          .delete(`http://localhost:3000/posts`, options)
          .pipe(
            switchMap(() => {
              return this.posts;
            }),
            take(1),
            tap(posts => {
              this._posts.next(posts.filter(p => p.id !== postId));
            })
          );
      })
    );
  }


  getPostsByUser(userId: string) {
    // /posts/user/:userId
    return this.http.get<Post>(`http://localhost:3000/posts/user/${userId}`).pipe(
      map(resData => {
        const posts = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            posts.push(
              new Post(
                resData[key].id,
                resData[key].title,
                resData[key].des,
                resData[key].imgUrl,
                resData[key].authorId,
                new Date(),
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



  getPost(postId: string) {
    return this.http
      .get<Post>(
        `http://localhost:3000/posts/${postId}`
      )
      .pipe(
        map(resData => {
          let post: Post;
          post = new Post(
                  postId,
                  resData.title,
                  resData.des,
                  resData.imgUrl,
                  resData.authorId,
                  new Date(),
                  resData.location
                );
          return post;
        })
      );
  }
}
