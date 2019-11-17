import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { AuthService } from '../auth/auth.service';
import { take, map, tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Crud } from '../crud';

@Injectable({
  providedIn: 'root'
})
export class PostService implements Crud<Post[]> {
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

  create(post: Post) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(posts => {
        this._posts.next(posts.concat(post));
      })
    );
  }

  read() {
    return this._posts.asObservable();
  }

  update(post: Post) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(posts => {
        const updatedId = posts.findIndex(pl => pl.id === post.id);
        const updatedPosts = [...posts];
        updatedPosts[updatedId] = post;
        this._posts.next(updatedPosts);
      })
    );
  }

  delete(postId: string) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(posts => {
        const updatedPosts = [...posts];
        this._posts.next(updatedPosts.filter(p => p.id !== postId));
      })
    );
  }

  getPost(postId: string) {
    return this.read().pipe(
      take(1),
      map(posts => {
        return { ...posts.find(p => p.id === postId) };
      })
    );
  }



}
