import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSidebarComponent } from './home-sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeSidebarComponent
  ],
  exports: [
    HomeSidebarComponent
  ]
})

export class HomeSidebarModule { }
