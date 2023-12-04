import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
  exports: [
    ChangePasswordComponent
  ]
})

export class ChangePasswordModule { }
