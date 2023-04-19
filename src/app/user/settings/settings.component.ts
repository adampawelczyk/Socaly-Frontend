import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UserModel } from '../shared/user.model';
import { UserSettingsService } from '../shared/user-settings.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Sorting } from '../shared/sorting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() activeId: string = "account";
  user: UserModel;
  userSettings: UserSettingsModel;
  SortingType = Sorting;
  file: File;

  constructor(private authService: AuthService ,private userService: UserService, private userSettingsService: UserSettingsService,
              private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.activeId = data.activeId;
    });

    this.user = this.authService.getUserDetails();
    this.userSettings = this.authService.getUserSettings();
  }

  changeOpenPostsInNewTab() {
    this.userSettingsService.changeOpenPostsInNewTab(!this.userSettings.openPostsInNewTab).subscribe(() => {
      this.userSettingsService.reloadUserSettings();
    })
  }

  changeCommunityContentSort(sorting: Sorting) {
    this.userSettingsService.changeCommunityContentSort(sorting).subscribe(() => {
      this.userSettings.communityContentSort = sorting;
      this.userSettingsService.reloadUserSettings();
    })
  }

  onChangeTab(url: NgbNavChangeEvent){
    this.location.replaceState("settings/" + url.nextId);
  }

  isHot() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.HOT] || this.userSettings.communityContentSort === Sorting.HOT;
  }

  isNew() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.NEW] || this.userSettings.communityContentSort === Sorting.NEW;
  }

  isTop() {
    return !this.isHot() && !this.isNew();
  }

  isTopToday() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_TODAY] || this.userSettings.communityContentSort === Sorting.TOP_TODAY;
  }

  isTopWeek() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_WEEK] || this.userSettings.communityContentSort === Sorting.TOP_WEEK;
  }

  isTopMonth() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_MONTH] || this.userSettings.communityContentSort === Sorting.TOP_MONTH;
  }

  isTopYear() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_YEAR] || this.userSettings.communityContentSort === Sorting.TOP_YEAR;
  }

  isTopAllTime() {
    return this.userSettings.communityContentSort.valueOf().toString() === Sorting[Sorting.TOP_ALL_TIME] || this.userSettings.communityContentSort === Sorting.TOP_ALL_TIME;
  }
}
