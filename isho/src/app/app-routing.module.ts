import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'posts', loadChildren: './posts/posts.module#PostsPageModule' }

  // { path: 'myposts', loadChildren: './posts/myposts/myposts.module#MypostsPageModule' },
  // { path: 'discover', loadChildren: './posts/discover/discover.module#DiscoverPageModule' },
  // { path: 'new-post', loadChildren: './posts/myposts/new-post/new-post.module#NewPostPageModule' },
  // { path: 'edit-post', loadChildren: './posts/myposts/edit-post/edit-post.module#EditPostPageModule' },
  // { path: 'post-detail', loadChildren: './posts/discover/post-detail/post-detail.module#PostDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
