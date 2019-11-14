import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit, OnDestroy {
  listedPosts: Post[];
  relevantPosts: Post[];

  postSub: Subscription;

  constructor(
    private postService: PostService,
    private menuCtl: MenuController
  ) {}

  ngOnInit() {
    this.postSub = this.postService.posts.subscribe(posts => {
      this.relevantPosts = posts;
      this.listedPosts = this.relevantPosts.slice(1);
      console.log(this.listedPosts);
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  onOpenMenu() {
    this.menuCtl.toggle();
  }
}
