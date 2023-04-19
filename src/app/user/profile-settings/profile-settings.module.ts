import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileSettingsComponent } from './profile-settings.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    ProfileSettingsComponent
  ],
  exports: [
    ProfileSettingsComponent
  ]
})

export class ProfileSettingsModule { }
