import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../../models/post.model';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  form: FormGroup;
  isLoading = false;

  constructor(
    private loadingCtl: LoadingController,
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }


  onCreatePost() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }

    this.isLoading = true;
    this.loadingCtl
      .create({ keyboardClose: true, message: 'creating post' })
      .then(loadingEl => {
        loadingEl.present();
        this.postService
          .create(
            new Post(Math.random().toString(),
            this.form.value.title,
            this.form.value.description,
            'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
            '',
            new Date(this.form.value.date))
            )
          .subscribe( () => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigateByUrl('/posts/tabs/myposts');
          });
        });

  }

}
