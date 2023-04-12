import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserModel } from '../shared/user.model';
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
  email: string;
  isEmailVerified: boolean;
  changeDescriptionForm: UntypedFormGroup;
  availableCharacters: number;
  SortingType = Sorting;

  constructor(private authService: AuthService ,private userService: UserService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.activeId = data.activeId;
    });

    this.changeDescriptionForm = new UntypedFormGroup({
      description: new UntypedFormControl('', Validators.required)
    });

    this.userService.getEmail().subscribe(data => {
      this.email = data;
    });

    this.userService.isEmailVerified().subscribe(data => {
      this.isEmailVerified = data;
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

  onChangeTab(url: NgbNavChangeEvent){
    this.location.replaceState("settings/" + url.nextId);
  }
}
