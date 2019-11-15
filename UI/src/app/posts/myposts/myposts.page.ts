import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

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
    private loadingCtl: LoadingController) {}

  ngOnInit() {
      this.userId = this.authService.userId;
      this.postSub = this.postService.read().subscribe(posts => {
      this.loadedPosts = posts.filter(p => p.userId === this.userId);
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  onPostView(postId: string){
    console.log('view ');
    // show modal
  }

  onPostEdit(postId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'posts', 'tabs', 'myposts', 'edit', postId]);
  }

  onPostDelete(postId: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this.isLoading = true;
    this.loadingCtl
      .create({ keyboardClose: true, message: 'deleting post' })
      .then(loadingEl => {
        loadingEl.present();

        this.postService.delete(postId)
          .subscribe( () => {
            loadingEl.dismiss();
            console.log('onPostDelete()');
            //this.router.navigateByUrl('/posts/tabs/myposts');
          });
      });
  }

}
