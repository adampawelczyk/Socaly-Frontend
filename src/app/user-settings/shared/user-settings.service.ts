import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSettingsModel } from './user-settings.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Sorting } from '../../../utilities/sorting';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  reloadUserSettings() {
    this.getUserSettings().subscribe(data => {
      this.localStorage.store('userSettings', data);
    })
  }

  getUserSettings(): Observable<UserSettingsModel> {
    return this.httpClient.get<UserSettingsModel>('http://localhost:8090/api/user/settings/get')
  }

  changeOpenPostsInNewTab(openPostsInNewTab: boolean): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/settings/change/open-posts-in-new-tab',
      openPostsInNewTab, {responseType: 'text'})
  }

  changeCommunityContentSort(sorting: Sorting) {
    return this.httpClient.patch('http://localhost:8090/api/user/settings/change/community-content-sort', sorting)
  }
}
