import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteComponent } from './user-delete.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    UserDeleteComponent
  ],
  exports: [
    UserDeleteComponent
  ]
})

export class UserDeleteModule { }