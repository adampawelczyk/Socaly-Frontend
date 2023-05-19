import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostComponent } from './view-post.component';
import { CommunitySidebarModule } from '../../community/community-sidebar/community-sidebar.module';
import { AboutCommunitySidebarModule } from '../../community/about-community-sidebar/about-community-sidebar.module';
import { PostModule } from '../post/post.module';

@NgModule({
  imports: [
    CommonModule,
    CommunitySidebarModule,
    AboutCommunitySidebarModule,
    PostModule
  ],
  declarations: [
    ViewPostComponent
  ],
  exports: [
    ViewPostComponent
  ]
})

export class ViewPostModule { }
