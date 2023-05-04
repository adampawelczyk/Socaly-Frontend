import { Component, OnInit } from '@angular/core';
import { UserSettingsModel } from '../shared/user-settings.model';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsService } from '../shared/user-settings.service';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss', './../shared/styles.scss']
})
export class EmailSettingsComponent implements OnInit {
  userSettings: UserSettingsModel;

  constructor(private authService: AuthService, private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    this.userSettings = this.authService.getUserSettings();
  }

  updatePostCommentEmails() {
    this.userSettingsService.updatePostCommentEmails(!this.userSettings.postCommentEmails).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
      this.userSettings.postCommentEmails = !this.userSettings.postCommentEmails;
    })
  }
}
