import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../shared/user.model';
import { AuthService } from '../../auth/shared/auth.service';
import { FileService } from '../../shared/file.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Input() userDetails: UserModel;
  username: string;
  file: File;
  isProfileImageUploading: boolean = false;
  isProfileBannerUploading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private fileService: FileService,
              private userService: UserService) {
    this.username = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void { }

  isCurrentUser(): boolean {
    return this.username === this.authService.getUsername()
  }

  async uploadProfileImage(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.isProfileImageUploading = true;
      let fileUrl = await this.fileService.uploadFile(file);
      this.isProfileImageUploading = false;

      this.userService.changeProfileImage(fileUrl).subscribe(() => {
        this.userService.getUserDetails(this.username).subscribe(data => {
          if (this.userDetails.profileImage.includes('uploads')) {
            this.fileService.removeFile(this.userDetails.profileImage);
          }

          this.userDetails.profileImage = data.profileImage;
        })
      })
    }
  }

  async uploadProfileBanner(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.isProfileBannerUploading = true;
      let fileUrl = await this.fileService.uploadFile(file);
      this.isProfileBannerUploading = false;

      this.userService.changeProfileBanner(fileUrl).subscribe(() => {
        this.userService.getUserDetails(this.username).subscribe(data => {
          if (this.userDetails.profileBanner.includes('uploads')) {
            this.fileService.removeFile(this.userDetails.profileBanner);
          }

          this.userDetails.profileBanner = data.profileBanner;
        })
      })
    }
  }

  openSettings(): void {

  }
}