import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { AppRoutingModule } from '../../app-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        NgbNavModule,
        ReactiveFormsModule
    ],
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ]
})

export class SettingsModule { }
