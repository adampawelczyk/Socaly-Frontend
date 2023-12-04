import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss', './../shared/styles.scss']
})
export class AccountSettingsComponent implements OnInit {
  email: string;
  isEmailVerified: boolean;

  constructor(private userService: UserService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.userService.getEmail().subscribe(email => {
      this.email = email;
    });

    this.userService.isEmailVerified().subscribe(isEmailVerified => {
      this.isEmailVerified = isEmailVerified;
    });
  }

  changeEmail(): void {
    const changeEmailModal = this.modal.open(ChangeEmailComponent, {size: "md"});
    changeEmailModal.closed.subscribe(() => {
      this.userService.getEmail().subscribe(email => {
        this.email = email;
      });
    })
  }

  updatePassword(): void {
    this.modal.open(ChangePasswordComponent, {size: "md"});
  }

  delete(): void {
    this.modal.open(UserDeleteComponent, {size: "md"});
  }
}
