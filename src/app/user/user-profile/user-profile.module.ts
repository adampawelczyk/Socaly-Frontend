import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { PostModule } from '../../post/post.module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    AppRoutingModule
  ],
  declarations: [
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ]
})

export class UserProfileModule { }
