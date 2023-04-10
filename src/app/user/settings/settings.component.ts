import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserModel } from '../shared/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: UserModel;
  userSettings: UserSettingsModel;
  changeDescriptionForm: UntypedFormGroup;
  availableCharacters: number;

  constructor(private authService: AuthService ,private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getUsername();
    this.userService.getUserSettings().subscribe(data => {
      this.userSettings = data;
      this.initializeDescriptionForm();
      this.availableCharacters = 255 - this.changeDescriptionForm.get('description')?.value.length;
    })

    this.changeDescriptionForm = new UntypedFormGroup({
      description: new UntypedFormControl('', Validators.required)
    });

    this.user = this.authService.getUserDetails();
    this.userSettings = this.authService.getUserSettings();
  }

  initializeDescriptionForm() {
    this.changeDescriptionForm.get('description')
      ?.setValue(this.userSettings.description ? this.userSettings.description : '');
  }

  changeDescription() {
    this.userService.changeDescription(this.changeDescriptionForm.get('description')?.value).subscribe(() => {

    })
  }

  countCharacters() {
    this.availableCharacters = 255 - this.changeDescriptionForm.get('description')?.value.length;
  }
}
