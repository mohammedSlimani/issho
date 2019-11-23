import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {


  form: FormGroup;
  isLoading: false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadingCtl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.userId.pipe(
      switchMap( userId => {
        if( !userId ) {
          throw Error('no user found');
        }
        return this.userService.getUser(userId);
      })
    ).subscribe(user => {
      this.form = new FormGroup({
        name: new FormControl(user.name, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        email: new FormControl(user.email, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        pwd: new FormControl(null , {
          updateOn: 'blur'
        })
      });
    });
  }

  onEditUser() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }

    this.loadingCtl.create({keyboardClose: true, message: 'editing your information'})
        .then(loadingEl => {
          loadingEl.present();
          this.userService
            .update(
              new User(
                '',
                this.form.value.email,
                this.form.value.name,
                'dd',
                new Date( new Date().getTime() + 60 * 1000)
              )
            )
            .subscribe( () => {
              loadingEl.dismiss();
              this.router.navigate(['/', 'user', this.authService.userId]);
            });
        });
  }



}
