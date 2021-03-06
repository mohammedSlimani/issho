import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService} from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit, OnDestroy {
  isLoading = false;
  isLogin = true;
  exists = false;

  form: FormGroup;
  user: User;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtl: LoadingController,
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
      }),
      name: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onProceed() {
    if (!this.form.valid) {
      console.log('signup form not valid');
      return;
    }

    this.isLoading = true;
    this.loadingCtl
      .create({ keyboardClose: true, message: 'loading...' })
      .then(loadingEl => {
        loadingEl.present();
        if (this.isLogin) {

          // login
          this.authService.login(
            this.form.value.email,
            this.form.value.pwd
          ).subscribe(resData => {
            console.log(resData);

            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/posts/tabs/discover');
          });
        } else {

          // signup
          this.authService.signup(
            this.form.value.email,
            this.form.value.pwd,
            this.form.value.name
          ).subscribe( () => {
            console.log('user created');

            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/posts/tabs/discover');
          });
        }

      });
  }

}
