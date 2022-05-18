import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitiesComponent } from './communities.component';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    CommunitiesComponent
  ],
  exports: [
    CommunitiesComponent
  ]
})

export class CommunitiesModule { }
