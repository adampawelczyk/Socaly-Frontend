import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserModel } from '../shared/user.model';
import { UserSettingsService } from '../shared/user-settings.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Sorting } from '../shared/sorting';
import { FileService } from '../../shared/file.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() activeId: string = "account";
  user: UserModel;
  userSettings: UserSettingsModel;
  changeDescriptionForm: UntypedFormGroup;
  availableCharacters: number;
  SortingType = Sorting;
  file: File;
  isProfileImageUploading: boolean = false;
  isProfileBannerUploading: boolean = false;

  constructor(private authService: AuthService ,private userService: UserService, private userSettingsService: UserSettingsService,
              private route: ActivatedRoute, private location: Location, private fileService: FileService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.activeId = data.activeId;
    });

    this.changeDescriptionForm = new UntypedFormGroup({
      description: new UntypedFormControl('', Validators.required)
    });

    this.user = this.authService.getUserDetails();
    this.userSettings = this.authService.getUserSettings();

    this.initializeDescriptionForm();
    this.availableCharacters = 255 - this.changeDescriptionForm.get('description')?.value.length;
  }

  initializeDescriptionForm() {
    this.changeDescriptionForm.get('description')
      ?.setValue(this.authService.getUserDetails().description ? this.authService.getUserDetails().description : '');
  }

  changeDescription() {
    this.userService.changeDescription(this.changeDescriptionForm.get('description')?.value).subscribe(() => {
      this.userService.getUserDetails(this.authService.getUsername()).subscribe(() => {
        this.userService.reloadUserDetails();
      })
    })
  }

  countCharacters() {
    this.availableCharacters = 255 - this.changeDescriptionForm.get('description')?.value.length;
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

  async changeProfileImage(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.isProfileImageUploading = true;
      let fileUrl = await this.fileService.uploadFile(file);
      this.isProfileImageUploading = false;

      this.userService.changeProfileImage(fileUrl).subscribe(() => {
        this.userService.getUserDetails(this.authService.getUsername()).subscribe(data => {
          if (this.user.profileImage.includes('uploads')) {
            this.fileService.removeFile(this.user.profileImage);
          }

          this.user.profileImage = data.profileImage;
          this.userService.reloadUserDetails();
        })
      })
    }
  }

  async changeProfileBanner(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.isProfileBannerUploading = true;
      let fileUrl = await this.fileService.uploadFile(file);
      this.isProfileBannerUploading = false;

      this.userService.changeProfileBanner(fileUrl).subscribe(() => {
        this.userService.getUserDetails(this.authService.getUsername()).subscribe(data => {
          if (this.user.profileBanner.includes('uploads')) {
            this.fileService.removeFile(this.user.profileBanner);
          }

          this.user.profileBanner = data.profileBanner;
          this.userService.reloadUserDetails();
        })
      })
    }
  }
}
