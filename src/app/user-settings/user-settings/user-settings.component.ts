import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user/shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserSettingsModel } from '../shared/user-settings.model';
import { UserModel } from '../../user/shared/user.model';
import { UserSettingsService } from '../shared/user-settings.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  @Input() activeId: string = "account";
  user: UserModel;

  constructor(private authService: AuthService ,private userService: UserService,
              private userSettingsService: UserSettingsService, private route: ActivatedRoute,
              private location: Location, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.activeId = data.activeId;
    });

    this.user = this.localStorage.retrieve('userDetails');
  }

  onChangeTab(url: NgbNavChangeEvent){
    this.location.replaceState("settings/" + url.nextId);
  }
}
