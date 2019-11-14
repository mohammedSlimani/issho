import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { AuthService } from '../auth/auth.service';
import { take, map, tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _posts = new BehaviorSubject<Post[]>([
    new Post(
      '11',
      'Practice Arabic and meet new friends from all over the world!',
      'des1',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      'u1',
      new Date('2019-10-5')
    ),
    new Post(
      '12',
      'Workshop méditation paix intérieure',
      'des2',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      'u1',
      new Date('2019-10-5')
    ),
    new Post(
      '13',
      'The Voice / Public speaking training Casablanca',
      'des3',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      'u1',
      new Date('2019-10-5')
    ),
    new Post(
      '14',
      'Workout session Hilton',
      'des4',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      'u2',
      new Date('2019-10-5')
    ),
    new Post(
      '15',
      'Lasse9 compta',
      'des5',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      'u3',
      new Date('2019-10-5')
    ),
    new Post(
      '16',
      'Olympiades Ensias v6',
      'des6',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      'u3',
      new Date('2019-10-5')
    )
  ]);

  constructor(private authService: AuthService) {}

  get posts() {
    return this._posts.asObservable();
  }

  getPost(postId: string) {
    return this._posts.pipe(
      take(1),
      map(posts => {
        return { ...posts.find(p => p.id === postId) };
      })
    );
  }

  addPost(title: string, des: string, date: Date) {
    const newPost = new Post(
      Math.random().toString(),
      title,
      des,
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      this.authService.userId,
      date
    );

    return this.posts.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._posts.next(places.concat(newPost));
      })
    );
  }

  editPost(postId: string, title: string, des: string) {
    return this.posts.pipe(
      take(1),
      delay(1000),
      tap(posts => {
        const updatedId = posts.findIndex(pl => pl.id === postId);
        const updatedPosts = [...posts];
        const oldPost: Post = updatedPosts[updatedId];
        updatedPosts[updatedId] = new Post(
          oldPost.id,
          title,
          des,
          oldPost.imgUrl,
          oldPost.userId,
          oldPost.date
        );
        this._posts.next(updatedPosts);
      })
    );
  }

  deletePost(postId: string) {
    return this.posts.pipe(
      take(1),
      delay(1000),
      tap(posts => {
        const updatedPosts = [...posts];
        updatedPosts.filter(p => p.id === postId);
        this._posts.next(updatedPosts.filter(p => p.id !== postId));
        console.log(
          'deletePost()',
          updatedPosts.filter(p => p.id !== postId)
        );
      })
    );
  }
}
