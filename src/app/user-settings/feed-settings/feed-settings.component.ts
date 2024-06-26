import { Component, OnInit } from '@angular/core';
import { Sorting } from '../../../utilities/sorting';
import { UserSettingsModel } from '../shared/user-settings.model';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsService } from '../shared/user-settings.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-feed-settings',
  templateUrl: './feed-settings.component.html',
  styleUrls: ['./feed-settings.component.scss', './../shared/styles.scss']
})
export class FeedSettingsComponent implements OnInit {
  userSettings: UserSettingsModel;
  SortingType = Sorting;

  constructor(private authService: AuthService,
              private userSettingsService: UserSettingsService,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.userSettings = this.localStorage.retrieve('userSettings');
  }

  updateCommunityContentSort(sorting: Sorting): void {
    this.userSettingsService.updateCommunityContentSort(sorting).subscribe(() => {
      this.userSettings.communityContentSort = sorting;
      this.userSettingsService.reloadUserSettings();
    })
  }

  updateOpenPostsInNewTab(): void {
    this.userSettingsService.updateOpenPostsInNewTab(!this.userSettings.openPostsInNewTab).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
    })
  }

  isHot(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.HOT]
      || this.userSettings.communityContentSort === Sorting.HOT;
  }

  isNew(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.NEW]
      || this.userSettings.communityContentSort === Sorting.NEW;
  }

  isTop(): boolean {
    return !this.isHot() && !this.isNew();
  }

  isTopToday(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_TODAY]
      || this.userSettings.communityContentSort === Sorting.TOP_TODAY;
  }

  isTopWeek(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_WEEK]
      || this.userSettings.communityContentSort === Sorting.TOP_WEEK;
  }

  isTopMonth(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_MONTH]
      || this.userSettings.communityContentSort === Sorting.TOP_MONTH;
  }

  isTopYear(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_YEAR]
      || this.userSettings.communityContentSort === Sorting.TOP_YEAR;
  }

  isTopAllTime(): boolean {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_ALL_TIME]
      || this.userSettings.communityContentSort === Sorting.TOP_ALL_TIME;
  }
}
