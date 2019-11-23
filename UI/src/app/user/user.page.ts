import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {

  user: User; // the visited profile
  userSub: Subscription;
  isLoading = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private navCtl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    // since the url: user/:userId
    this.route.paramMap.subscribe( paramMap => {
      // if empty
      if (!paramMap.has('userId')) {
        this.navCtl.navigateBack('/posts/tabs/discover');
        return;
      }
      this.userSub = this.userService.getUser( paramMap.get('userId') ).subscribe( user => {
        this.user = user;
      });
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onEditUser() {
    console.log('edit user');
    this.router.navigateByUrl('/user/edit');
  }

}
