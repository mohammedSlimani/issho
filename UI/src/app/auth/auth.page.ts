import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtl: LoadingController
  ) {}

  ngOnInit() {}

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onLogin() {
    this.authService.login();
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
  }

  onSubmit() {}
}
