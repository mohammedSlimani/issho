import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PostsPage } from './posts.page';


const routes: Routes = [
    {
        path: 'tabs',
        component: PostsPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: './discover/discover.module#DiscoverPageModule'
                    },
                    {
                        path: ':postId',
                        loadChildren: './discover/post-detail/post-detail.module#PostDetailPageModule'
                    }
                ]
            },
            {
                path: 'myposts',
                children: [
                    {
                        path: '',
                        loadChildren: './myposts/myposts.module#MypostsPageModule'
                    },
                    {
                        path: 'new',
                        loadChildren: './myposts/new-post/new-post.module#NewPostPageModule'
                    },
                    {
                        path: 'edit/:postId',
                        loadChildren: './myposts/edit-post/edit-post.module#EditPostPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/posts/tabs/discover',
        pathMatch: 'full'
    }
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule {}