import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../shared/user.model';
import { AuthService } from '../../auth/shared/auth.service';
import { FileService } from '../../shared/file.service';
import { UserService } from '../shared/user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Input() user: UserModel;
  username: string;
  file: File;
  isProfileImageUploading: boolean = false;
  isProfileBannerUploading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private fileService: FileService,
              private userService: UserService,
              private router: Router,
              private localStorage: LocalStorageService) {
    this.username = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void { }

  isProfileOwner(): boolean {
    return this.username === this.localStorage.retrieve('username');
  }

  async changeProfileImage(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.isProfileImageUploading = true;
      let fileUrl = await this.fileService.uploadFile(file);
      this.isProfileImageUploading = false;

      this.userService.changeProfileImage(fileUrl).subscribe(() => {
        this.userService.get(this.username).subscribe(data => {
          if (this.user.profileImage.includes('uploads')) {
            this.fileService.removeFile(this.user.profileImage);
          }

          this.user.profileImage = data.profileImage;
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
        this.userService.get(this.username).subscribe(data => {
          if (this.user.profileBanner.includes('uploads')) {
            this.fileService.removeFile(this.user.profileBanner);
          }

          this.user.profileBanner = data.profileBanner;
        })
      })
    }
  }

  openSettings(): void {
    this.router.navigateByUrl('/settings/profile');
  }
}
