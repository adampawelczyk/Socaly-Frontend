import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  email: string;
  isEmailVerified: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getEmail().subscribe(data => {
      this.email = data;
    });

    this.userService.isEmailVerified().subscribe(data => {
      this.isEmailVerified = data;
    });
  }
}
