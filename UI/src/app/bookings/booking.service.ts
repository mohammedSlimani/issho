import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { Crud } from '../crud';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap, map, switchMap } from 'rxjs/operators';
import { PostService } from '../posts/post.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';


interface BookingData {
  id: string;
  postId: string;
  userId: string;
}


@Injectable({
  providedIn: 'root'
})
export class BookingService implements Crud<Booking[]> {
  private _bookings = new BehaviorSubject<Booking[]>( [] );

  constructor(
    private postService: PostService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  create(booking: Booking) {
    let generatedId: string;
    // get the latest userId
    return this.authService.userId.pipe(
      take(1),
      switchMap( userId => {
        booking.userId = userId;
        return this.http.post<{ name: string }>(
          'https://issho-7539b.firebaseio.com/bookings.json',
          {
            ...booking,
            id: null
          }
        );
      }),
        switchMap(resData => {
          generatedId = resData.name;
          return this.bookings;
        }),
        take(1),
        tap(posts => {
          booking.id = generatedId;
          this._bookings.next(posts.concat(booking));
        })
      );
  }

  read() {
    return this.http
      .get<{ [key: string]: BookingData }>(
        'https://issho-7539b.firebaseio.com/bookings.json'
      )
      .pipe(
        map(resData => {
          const bookings = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  resData[key].postId,
                  resData[key].userId
                )
              );
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }

  update(booking: Booking) {
    let updatedBookings: Booking[];
    return this.bookings.pipe(
      take(1),
      switchMap(bookings => {
        const updatedId = bookings.findIndex(pl => pl.id === booking.id);
        updatedBookings = [...bookings];
        updatedBookings[updatedId] = booking;

        return this.http.put(
          `https://issho-7539b.firebaseio.com/bookings/${booking.id}.json`,
          { ...updatedBookings[updatedId], id: null }
        );
      }),
      tap(() => {
        this._bookings.next(updatedBookings);
      })
    );
  }

  delete(bookingId: string) {
    return this.http
      .delete(`https://issho-7539b.firebaseio.com/bookings/${bookingId}.json`)
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings.filter(p => p.id !== bookingId));
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
