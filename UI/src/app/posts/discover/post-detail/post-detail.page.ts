import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../post.model';
import { NavController } from '@ionic/angular';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { Booking } from 'src/app/bookings/booking.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit, OnDestroy {

  post: Post;
  booked =  false;
  booking: Booking;
  goin: number;

  postSub: Subscription;
  bookSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtl: NavController,
    private postService: PostService,
    private bookingService: BookingService,
    private authService: AuthService
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

        this.bookSub = this.bookingService.getBookingByPost(this.post.id).subscribe( bks => {
          this.goin = bks.length;
          this.booked = bks.filter(bk => bk.userId === this.authService.userId).length > 0;
          if ( this.booked ) {
            this.booking = bks.filter( bk => bk.userId === this.authService.userId)[0];
          }
        });

      });
  }

  ngOnDestroy() {
    if(this.postSub) {
      this.postSub.unsubscribe();
    }
    if(this.bookSub ) {
      this.bookSub.unsubscribe();
    }
  }

  onUnbook() {
    this.bookingService.delete(this.booking.id).subscribe( bks => {
      this.booked = false;
    });
  }

  onBook() {
    if ( this.booked ) {
      this.onUnbook();
      return;
    }
    console.log('booking added');
    this.bookingService
      .create(
          new Booking(
              Math.random().toString(),
              this.post.id,
              this.authService.userId))
      .subscribe( bks => {
        this.booked = true;
      });
  }

}
