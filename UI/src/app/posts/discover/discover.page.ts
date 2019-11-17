import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from 'src/app/bookings/booking.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  listedPosts: Post[];
  relevantPost: Post;
  postGoing =  {};

  bookSub: Subscription;
  postSub: Subscription;

  constructor(
    private postService: PostService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.postSub = this.postService.read().subscribe(posts => {
      this.relevantPost = posts[0];
      this.listedPosts = posts.slice(1);
    });

    this.bookSub = this.bookingService.read().subscribe(bks => {
      this.listedPosts.forEach( p => {
        this.postGoing[p.id] = bks.filter(bk => bk.postId === p.id).length;
      });
      this.postGoing[this.relevantPost.id] = bks.filter(
        bk => bk.postId === this.relevantPost.id
      ).length;
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if( this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }
}
