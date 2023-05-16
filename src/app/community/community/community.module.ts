import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityComponent } from './community.component';
import { AboutCommunitySidebarModule } from '../about-community-sidebar/about-community-sidebar.module';
import { PostModule } from '../../post/post.module';
import { CreatePostTopbarModule } from '../../post/create-post-topbar/create-post-topbar.module';

@NgModule({
  imports: [
    CommonModule,
    AboutCommunitySidebarModule,
    PostModule,
    CreatePostTopbarModule
  ],
  declarations: [
    CommunityComponent
  ],
  exports: [
    CommunityComponent
  ]
})

export class CommunityModule { }
