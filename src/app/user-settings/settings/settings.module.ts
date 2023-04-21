import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsModule } from '../account-settings/account-settings.module';
import { ProfileSettingsModule } from '../profile-settings/profile-settings.module';
import { FeedSettingsModule } from '../feed-settings/feed-settings.module';
import { EmailSettingsModule } from '../email-settings/email-settings.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AccountSettingsModule,
    ProfileSettingsModule,
    FeedSettingsModule,
    EmailSettingsModule
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ]
})

export class SettingsModule { }
