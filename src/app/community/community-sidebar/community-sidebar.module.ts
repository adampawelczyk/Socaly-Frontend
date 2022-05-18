import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitySidebarComponent } from './community-sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CommunitySidebarComponent
  ],
  exports: [
    CommunitySidebarComponent
  ]
})

export class CommunitySidebarModule { }
