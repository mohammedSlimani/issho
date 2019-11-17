import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from '../models/booking.model';
import { Subscription } from 'rxjs';
import { BookingService } from './booking.service';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../posts/post.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  myBookings: Booking[];
  bookedPost = {};
  bookSub: Subscription;
  postSub: Subscription;
  isLoading = false;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private postService: PostService,
    private loadingCtl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
    this.bookSub = this.bookingService.getBookingByUser(this.authService.userId).subscribe( bks => {
      this.myBookings = bks;
    });

    this.postSub = this.postService.read().subscribe(posts => {
      this.myBookings.forEach(bk => {
        this.bookedPost[bk.id] = posts.find(p => p.id === bk.postId);
      });
    });
  }

  ngOnDestroy() {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
    if ( this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  onDeleteBooking(bookingId: string, slidingItem: IonItemSliding) {

    this.isLoading = true;
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

}
