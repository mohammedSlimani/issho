import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../user/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit, OnDestroy {
  isLoading = false;
  isLogin = true;

  form: FormGroup;
  userSub: Subscription;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtl: LoadingController,
    private userService: UserService
  ) {}

  ngOnInit() {

    this.form = new FormGroup({
          email: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          pwd: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required]
          }) });

  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSignup() {}

  onLogin() {
    this.userService.verify(
      this.form.value.email,
      this.form.value.pwd
    ).subscribe( user => {
      console.log(user);
      if ( !user.id ) {
        console.log('you are not');
        return;
      }
      this.authService.login(user.id);
      this.isLoading = true;
      this.loadingCtl
        .create({ keyboardClose: true, message: 'login in' })
        .then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/posts/tabs/discover');
          }, 1500);
        });
    });
  }


}
