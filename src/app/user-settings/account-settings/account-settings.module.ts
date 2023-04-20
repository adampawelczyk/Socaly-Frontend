import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountSettingsComponent} from "./account-settings.component";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AccountSettingsComponent
  ],
  exports: [
    AccountSettingsComponent
  ]
})

export class AccountSettingsModule { }
