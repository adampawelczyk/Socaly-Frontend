import { Component, OnInit } from '@angular/core';
import { UserSettingsModel } from '../shared/user-settings.model';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsService } from '../shared/user-settings.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss', './../shared/styles.scss']
})
export class EmailSettingsComponent implements OnInit {
  userSettings: UserSettingsModel;

  constructor(private authService: AuthService,
              private userSettingsService: UserSettingsService,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.userSettings = this.localStorage.retrieve('userSettings');
  }

  updatePostCommentEmails(): void {
    this.userSettingsService.updatePostCommentEmails(!this.userSettings.postCommentEmails).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
      this.userSettings.postCommentEmails = !this.userSettings.postCommentEmails;
    })
  }

  updateCommentReplyEmails(): void {
    this.userSettingsService.updateCommentReplyEmails(!this.userSettings.commentReplyEmails).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
      this.userSettings.commentReplyEmails = !this.userSettings.commentReplyEmails;
    });
  }

  updatePostUpVoteEmails(): void {
    this.userSettingsService.updatePostUpVoteEmails(!this.userSettings.postUpVoteEmails).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
      this.userSettings.postUpVoteEmails = !this.userSettings.postUpVoteEmails;
    })
  }

  updateCommentUpVoteEmails(): void {
    this.userSettingsService.updateCommentUpVoteEmails(!this.userSettings.commentUpVoteEmails).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
      this.userSettings.commentUpVoteEmails = !this.userSettings.commentUpVoteEmails;
    });
  }
}
