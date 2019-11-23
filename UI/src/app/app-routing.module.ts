import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'},
  { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule', canLoad:[AuthGuard] },
  { path: 'posts', loadChildren: './posts/posts.module#PostsPageModule', canLoad: [AuthGuard]},
  {
    path: 'user',
    children: [
      {
        path: 'edit',
        loadChildren: './user/edit-user/edit-user.module#EditUserPageModule',
        canLoad: [AuthGuard]
      },
      {
        path: ':userId',
        loadChildren: './user/user.module#UserPageModule',
        canLoad: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
