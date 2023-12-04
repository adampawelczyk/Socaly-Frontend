import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSettingsModel } from './user-settings.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Sorting } from '../../../utilities/sorting';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  reloadUserSettings() {
    this.getUserSettings().subscribe(userSettings => {
      this.localStorage.store('userSettings', userSettings);
    })
  }

  getUserSettings(): Observable<UserSettingsModel> {
    return this.httpClient.get<UserSettingsModel>(apiURL + '/user/settings/get');
  }

  updateOpenPostsInNewTab(openPostsInNewTab: boolean): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/settings/update/open-posts-in-new-tab',
      openPostsInNewTab, {responseType: 'text'});
  }

  updateCommunityContentSort(sorting: Sorting): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/settings/update/community-content-sorting', sorting);
  }

  updatePostCommentEmails(postCommentEmails: boolean): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/settings/update/post-comment-emails', postCommentEmails,
      {responseType: 'text'});
  }

  updateCommentReplyEmails(commentReplyEmails: boolean): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/settings/update/comment-reply-emails', commentReplyEmails,
      {responseType: 'text'});
  }

  updatePostUpVoteEmails(postUpVoteEmails: boolean): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/settings/update/post-up-vote-emails',
      postUpVoteEmails, {responseType: 'text'});
  }

  updateCommentUpVoteEmails(commentUpVoteEmails: boolean): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/settings/update/comment-up-vote-emails',
      commentUpVoteEmails, {responseType: 'text'});
  }
}
