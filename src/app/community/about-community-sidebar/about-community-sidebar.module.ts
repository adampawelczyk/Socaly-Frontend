import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutCommunitySidebarComponent } from './about-community-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    AboutCommunitySidebarComponent
  ],
  exports: [
    AboutCommunitySidebarComponent
  ]
})

export class AboutCommunitySidebarModule { }
