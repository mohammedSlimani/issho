import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss']
})
export class MypostsPage implements OnInit, OnDestroy {
  loadedPosts: Post[];
  userId: string;

  postSub: Subscription;
  isLoading = true;

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private loadingCtl: LoadingController
  ) {}

  ngOnInit() {

    // take latest userId
    let myId: string;
    this.isLoading = true;
    this.postSub = this.authService.userId
      .pipe(
        take(1),
        switchMap(userId => {
          if (!userId) {
            throw Error('no user found');
          }
          myId = userId;
          return this.postService.read();
          // return this.postService.getPostsByUser(userId);
        })
      )
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isLoading = false;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.postService.getPostsByUser(this.userId).subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  onPostView(postId: string) {
    console.log('view ');
    // show modal
  }

  onPostEdit(postId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'posts', 'tabs', 'myposts', 'edit', postId]);
  }

  onPostDelete(postId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtl
      .create({ keyboardClose: true, message: 'deleting post' })
      .then(loadingEl => {
        loadingEl.present();

        this.postService.delete(postId).subscribe(() => {
          loadingEl.dismiss();
          console.log('onPostDelete()');
        });
      });
  }
}
