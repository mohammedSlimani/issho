import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from '../models/booking.model';
import { Subscription } from 'rxjs';
import { BookingService } from './booking.service';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../posts/post.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  myBookings: Booking[];
  bookedPost = {};
  bookSub: Subscription;
  postSub: Subscription;
  userId: string;
  isLoading = false;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private postService: PostService,
    private loadingCtl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userId.pipe(take(1)).subscribe(userId => {
      this.userId = userId;
    });

    this.bookSub = this.bookingService
      .getBookingByUser(this.userId)
      .subscribe(bks => {
        this.myBookings = bks;
      });

    this.postSub = this.postService.read().subscribe(posts => {
      this.myBookings.forEach(bk => {
        this.bookedPost[bk.id] = posts.find(p => p.id === bk.postId);
      });
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.read().subscribe(() => {
      this.isLoading = false;
    });

    this.isLoading = true;
    this.postService.read().subscribe(() => {
      this.isLoading = false;
    });
  }

  onDeleteBooking(bookingId: string, slidingItem: IonItemSliding) {
    this.loadingCtl
      .create({ keyboardClose: true, message: 'deleting booking' })
      .then(loadingEl => {
        loadingEl.present();

        this.bookingService.delete(bookingId).subscribe(() => {
          slidingItem.close();
          loadingEl.dismiss();
          this.myBookings = this.myBookings.filter(bk => bk.id !== bookingId);
        });
      });
  }

  ngOnDestroy() {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
