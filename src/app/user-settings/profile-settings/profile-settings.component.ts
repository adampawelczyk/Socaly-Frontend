import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/shared/auth.service';
import { UserService } from '../../user/shared/user.service';
import { FileService } from '../../shared/file.service';
import { UserModel } from '../../user/shared/user.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  user: UserModel;
  changeDescriptionForm: UntypedFormGroup;
  availableCharacters: number;
  isProfileImageUploading: boolean = false;
  isProfileBannerUploading: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private fileService: FileService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserDetails();

    this.changeDescriptionForm = new UntypedFormGroup({
      description: new UntypedFormControl('', Validators.required)
    });

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