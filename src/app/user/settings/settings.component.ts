import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  name: string;
  userSettings: UserSettingsModel;
  changeDescriptionForm: UntypedFormGroup;

  constructor(private authService: AuthService ,private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getUsername();
    this.userService.getUserSettings().subscribe(data => {
      this.userSettings = data;
      this.initializeDescriptionForm();
    })

    this.changeDescriptionForm = new UntypedFormGroup({
      description: new UntypedFormControl('', Validators.required)
    });

  }

  initializeDescriptionForm() {
    this.changeDescriptionForm.get('description')
      ?.setValue(this.userSettings.description ? this.userSettings.description : '');
  }

  changeDescription() {
    this.userService.changeDescription(this.changeDescriptionForm.get('description')?.value).subscribe(() => {

    })
  }
}
