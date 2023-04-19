import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmailSettingsComponent } from './email-settings.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    EmailSettingsComponent
  ],
  exports: [
    EmailSettingsComponent
  ]
})

export class EmailSettingsModule { }
