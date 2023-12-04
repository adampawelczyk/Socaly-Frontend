import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEmailComponent as ChangeEmailComponent } from './change-email.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChangeEmailComponent
  ],
  exports: [
    ChangeEmailComponent
  ]
})

export class ChangeEmailModule { }
