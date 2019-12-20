import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post.model';
import { NavController, NavParams } from '@ionic/angular';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/auth/auth.service';
import { take, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss']
})
export class PostDetailPage implements OnInit, OnDestroy {
  post: Post;
  postId: string;
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
    private authService: AuthService,
    ) {
      console.log('init details');
    }

  ngOnInit() {


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


      let myId: string;
      this.authService.userId.pipe(
         switchMap(userId => {
           if (!userId) {
             throw new Error('no user found');
           }
           myId = userId;
           return this.postService.getPost(this.postId);
         })
       ).subscribe( pst => {
          console.log(this.booked);
          this.booked = pst.usersPended.filter(u => u === myId).length === 1;
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
  }

  onUnbook() {
    this.postService.unbookPost(this.post.id).subscribe(() => {
      this.booked = false;
    });
  }

  onBook() {
    if (this.booked) {
      this.onUnbook();
      return;
    }
    console.log('booking added');
    this.postService.bookPost(this.post.id).subscribe(() => {
      this.booked = true;
    });

  }
}
