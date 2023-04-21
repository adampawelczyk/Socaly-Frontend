import { Component, OnInit } from '@angular/core';
import { UserSettingsModel } from '../shared/user-settings.model';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss', './../shared/styles.scss']
})
export class EmailSettingsComponent implements OnInit {
  userSettings: UserSettingsModel;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSettings = this.authService.getUserSettings();
  }

}
