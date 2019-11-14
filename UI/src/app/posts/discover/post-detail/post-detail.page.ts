import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../post.model';
import { NavController } from '@ionic/angular';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit, OnDestroy {

  post: Post;
  postSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtl: NavController,
    private postService: PostService
  ) { }

  ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('postId')) {
          this.navCtl.navigateBack('/posts/tabs/discover');
          return;
        }
        this.postSub = this.postService.getPost(paramMap.get('postId')).subscribe(post => {
          this.post = post;
        });

      });
  }

  ngOnDestroy() {
    if(this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  onPostParticipate() {
    this.router.navigateByUrl('/posts/tabs/discover');
  }

}
