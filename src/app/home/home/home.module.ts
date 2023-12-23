import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeSidebarModule } from '../home-sidebar/home-sidebar.module';
import { CommunitySidebarModule } from '../../community/community-sidebar/community-sidebar.module';
import { PostModule } from '../../post/post/post.module';
import { CreateEditPostModule } from 'src/app/post/create-edit-post/create-edit-post.module';

@NgModule({
  imports: [
    CommonModule,
    HomeSidebarModule,
    CommunitySidebarModule,
    PostModule,
    CreateEditPostModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }
