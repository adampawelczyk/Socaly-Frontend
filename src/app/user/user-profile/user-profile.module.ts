import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { PostModule } from '../../post/post.module';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSidebarModule } from '../user-sidebar/user-sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    PostModule,
    AppRoutingModule,
    NgbNavModule,
    UserSidebarModule
  ],
  declarations: [
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ]
})

export class UserProfileModule { }
