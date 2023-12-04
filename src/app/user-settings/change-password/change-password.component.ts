import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangePasswordRequestModel } from '../shared/change-password-request.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user/shared/user.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: UntypedFormGroup;
  changePasswordPayload: ChangePasswordRequestModel;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');

    this.changePasswordForm = new UntypedFormGroup({
      currentPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', Validators.required),
      confirmNewPassword: new UntypedFormControl('', Validators.required)
    });

    this.changePasswordPayload = {
      currentPassword: '',
      newPassword: ''
    }
  }

  discard(): void {
    this.activeModal.close();
  }

  change(): void {
    this.changePasswordPayload.currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    this.changePasswordPayload.newPassword = this.changePasswordForm.get('newPassword')?.value;

    this.userService.changePassword(this.changePasswordPayload).subscribe(() => {

      this.activeModal.close();
    }, error => {
      throwError(error);
    });
  }

  arePasswordFieldsEmpty(): boolean {
    return this.changePasswordForm.get('currentPassword')?.value === ''
      || this.changePasswordForm.get('newPassword')?.value === ''
      || this.changePasswordForm.get('confirmNewPassword')?.value === '';
  }

  areNewPasswordsEqual(): boolean {
    return this.changePasswordForm.get('newPassword')?.value
      === this.changePasswordForm.get('confirmNewPassword')?.value;
  }
}
