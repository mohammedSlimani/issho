import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post.model';
import { NavController, NavParams } from '@ionic/angular';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss']
})
export class PostDetailPage implements OnInit, OnDestroy {
  post: Post;
  postId: string;
  userId: string;
  booked = false;
  booking: Booking;
  goin: number;
  isLoading = false;

  postSub: Subscription;
  bookSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtl: NavController,
    private postService: PostService,
    private bookingService: BookingService,
    private authService: AuthService,
    ) {
      console.log('init details');
    }

  ngOnInit() {

    this.authService.userId.pipe(take(1)).subscribe(userId => {
      this.userId = userId;
    });

    console.log('ngOnInit');
    this.route.paramMap.subscribe(paramMap => {
      // checking param
      if (!paramMap.has('postId')) {
        this.navCtl.navigateBack('/posts/tabs/discover');
        return;
      }
      this.postId = paramMap.get('postId');


      // loading the post
      this.isLoading = true;
      this.postSub = this.postService.getPost(this.postId).subscribe(post => {
        this.post = post;
        this.isLoading = false;
      });


      // loading booking count
      this.isLoading = true;
      this.bookSub = this.bookingService
        .getBookingByPost(this.postId)
        .subscribe(bks => {
          this.goin = bks.length;
          this.booked =
            bks.filter(bk => bk.userId === this.userId).length > 0;
          if (this.booked) {
            this.booking = bks.find(
              bk => bk.userId === this.userId
            );
          }
          this.isLoading = false;
        });
    });

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }

  onUnbook() {
    this.bookingService.delete(this.booking.id).subscribe(bks => {
      this.booked = false;
    });
  }

  onBook() {
    if (this.booked) {
      this.onUnbook();
      return;
    }
    console.log('booking added');
    this.bookingService
      .create(
        new Booking(
          Math.random().toString(),
          this.post.id,
          this.userId
        )
      )
      .subscribe(bks => {
        this.booked = true;
      });
  }
}
