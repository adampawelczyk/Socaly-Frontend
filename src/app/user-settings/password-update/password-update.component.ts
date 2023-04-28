import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PasswordUpdateRequestModel } from '../shared/password-update-request.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user/shared/user.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
  passwordUpdateForm: UntypedFormGroup;
  passwordUpdatePayload: PasswordUpdateRequestModel;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');

    this.passwordUpdateForm = new UntypedFormGroup({
      currentPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', Validators.required),
      confirmNewPassword: new UntypedFormControl('', Validators.required)
    });

    this.passwordUpdatePayload = {
      currentPassword: '',
      newPassword: ''
    }
  }

  discard() {
    this.activeModal.close();
  }

  updatePassword() {
    this.passwordUpdatePayload.currentPassword = this.passwordUpdateForm.get('currentPassword')?.value;
    this.passwordUpdatePayload.newPassword = this.passwordUpdateForm.get('newPassword')?.value;

    this.userService.updatePassword(this.passwordUpdatePayload).subscribe(() => {

      this.activeModal.close();
    }, error => {
      console.log(error);
      throwError(error);
    })
  }
}
