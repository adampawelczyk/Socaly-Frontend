import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailUpdateComponent } from '../email-update/email-update.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss', './../shared/styles.scss']
})
export class AccountSettingsComponent implements OnInit {
  email: string;
  isEmailVerified: boolean;

  constructor(private userService: UserService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.userService.getEmail().subscribe(data => {
      this.email = data;
    });

    this.userService.isEmailVerified().subscribe(data => {
      this.isEmailVerified = data;
    });
  }

  updateEmail() {
    let emailUpdateModal = this.modal.open(EmailUpdateComponent, {size: "md"});
    emailUpdateModal.closed.subscribe(() => {
      this.userService.getEmail().subscribe(data => {
        this.email = data;
      });
    })
  }
}
