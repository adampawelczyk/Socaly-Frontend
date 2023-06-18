import { LogInComponent } from './log-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LogInComponent
  ],
  exports: [
    LogInComponent
  ]
})

export class LogInModule { }
