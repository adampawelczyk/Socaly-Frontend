import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UserModel } from '../shared/user.model';
import { UserSettingsService } from '../shared/user-settings.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() activeId: string = "account";
  user: UserModel;
  userSettings: UserSettingsModel;
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

  onChangeTab(url: NgbNavChangeEvent){
    this.location.replaceState("settings/" + url.nextId);
  }
}
