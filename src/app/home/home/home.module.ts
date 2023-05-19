import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeSidebarModule } from '../home-sidebar/home-sidebar.module';
import { CommunitySidebarModule } from '../../community/community-sidebar/community-sidebar.module';
import { PostModule } from '../../post/post/post.module';
import { CreatePostTopbarModule } from '../../post/create-post-topbar/create-post-topbar.module';

@NgModule({
  imports: [
    CommonModule,
    HomeSidebarModule,
    CommunitySidebarModule,
    PostModule,
    CreatePostTopbarModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }
