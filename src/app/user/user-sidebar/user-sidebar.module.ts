import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSidebarComponent } from './user-sidebar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbNavModule
  ],
  declarations: [
    UserSidebarComponent
  ],
  exports: [
    UserSidebarComponent
  ]
})

export class UserSidebarModule { }
