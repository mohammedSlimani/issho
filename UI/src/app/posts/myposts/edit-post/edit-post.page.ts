import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../post.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit, OnDestroy {

  form: FormGroup;
  postId: string;
  isLoading = false;
  post: Post;
  postSub: Subscription;

  constructor(
    private postService: PostService,
    private loadingCtl: LoadingController,
    private router: Router,
    private navCtl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('postId')) {
        this.navCtl.navigateBack('/posts/tabs/myposts');
        return;
      }
      this.postId = paramMap.get('postId');

      this.isLoading = true;
      this.postSub = this.postService.getPost(this.postId).subscribe(post => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(this.post.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.post.des, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy() {
    if ( this.postSub) {
      this.postSub.unsubscribe();
    }
  }


  onEditPost() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    this.loadingCtl
      .create({ keyboardClose: true, message: 'editing post' })
      .then(loadingEl => {
        loadingEl.present();
        this.postService
          .update(
              new Post(
                this.post.id,
                this.form.value.title,
                this.form.value.description,
                this.post.imgUrl,
                this.post.authorId) )
          .subscribe( () => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigateByUrl('/posts/tabs/myposts');
          });
      });
  }

}
