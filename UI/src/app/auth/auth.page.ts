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
  exists = false;

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
    if (!this.isLogin) {
      this.onSignup();
    } else {
      this.onLogin();
    }
  }

  onSignup() {
    if (!this.form.valid || !this.form.value.name) {
      console.log('signup form not valid');
      return;
    }

    // verify
    this.exists = false;
    this.userService
      .verifySignup(this.form.value.email)
      .subscribe(user => {
        console.log(user);
        if (user.id) {
          console.log('already exists');
          this.exists = true;
          return;
        }
        this.exists = false;

        // create
        if ( !this.exists ) {
          this.userService
          .create(
            new User(
              Math.random().toString(),
              this.form.value.email,
              this.form.value.pwd,
              this.form.value.name
            )
          ).subscribe(() => {
            this.exists = true;
            this.isLoading = true;
            this.loadingCtl
              .create({ keyboardClose: true, message: 'signing up' })
              .then(loadingEl => {
                loadingEl.present();
                setTimeout(() => {
                  this.isLoading = false;
                  loadingEl.dismiss();
                  this.form.reset();
                  this.onSwitchAuthMode();
                }, 1500);
              });
          });
      }
      });

  }

  onLogin() {
    if (!this.form.valid) {
      console.log('form not valid');
      return;
    }
    this.exists = false;
    this.userService
      .verifyLogin(
        this.form.value.email,
        this.form.value.pwd)
      .subscribe(user => {
        console.log(user);
        if (!user.id) {
          console.log('you are not');
          this.exists = false;
          return;
        }
        this.exists = true;

        // login
        this.authService.login(user.id);
        // loading
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
