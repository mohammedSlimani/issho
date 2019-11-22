import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  listedPosts: Post[];
  relevantPost: Post;
  postGoing = {};
  isLoading = false;

  bookSub: Subscription;
  postSub: Subscription;

  constructor(
    private postService: PostService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postSub = this.postService.posts.subscribe(posts => {
      this.listedPosts = posts;
      this.relevantPost = posts[0];
    });

    this.bookSub = this.bookingService.bookings.subscribe(bks => {
        this.listedPosts.forEach(p => {
          this.postGoing[p.id] = bks.filter(bk => bk.postId === p.id).length;
        });

    });

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ');
    this.isLoading = true;
    this.postService.read().subscribe( () => {
      this.isLoading = false;
    });

    this.isLoading = true;
    this.bookingService.read().subscribe(() => {
      this.isLoading = false;
    });
  }


  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }

}
