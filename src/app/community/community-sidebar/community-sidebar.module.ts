import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitySidebarComponent } from './community-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
  declarations: [
    CommunitySidebarComponent
  ],
  exports: [
    CommunitySidebarComponent
  ]
})

export class CommunitySidebarModule { }
