import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { Crud } from '../crud';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap, map } from 'rxjs/operators';
import { PostService } from '../posts/post.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService implements Crud<Booking[]> {
  private _bookings = new BehaviorSubject<Booking[]>( [] );

  constructor(
    private postService: PostService
  ) {}

  create(booking: Booking) {
    return this.read().pipe(
      take(1),
      delay(500),
      tap(bookings => {
        this._bookings.next(bookings.concat(booking));
      })
    );
  }

  read() {
    return this._bookings.asObservable();
  }

  update(booking: Booking) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        const updatedId = bookings.findIndex(bk => bk.id === booking.id);
        const updatedBookings = [...bookings];
        updatedBookings[updatedId] = booking;
        this._bookings.next(updatedBookings);
      })
    );
  }

  delete(bookingId: string) {
    return this.read().pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        const updatedBookings = [...bookings];
        this._bookings.next(updatedBookings.filter(bk => bk.id !== bookingId));
      })
    );
  }

  getBookingByUser(userId: string) {
    return this.read().pipe(
      take(1),
      map(bks => {
        return [...bks.filter(bk => bk.userId === userId)];
      })
    );
  }

  getBookingByPost(postId: string) {
    return this.read().pipe(
      take(1),
      map(bks => {
        return [...bks.filter(bk => bk.postId === postId) ];
      })
    );
  }
}
