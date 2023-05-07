import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedSettingsComponent } from './feed-settings.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    FeedSettingsComponent
  ],
  exports: [
    FeedSettingsComponent
  ]
})

export class FeedSettingsModule { }
