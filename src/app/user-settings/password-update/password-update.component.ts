import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PasswordUpdateRequestModel } from '../shared/password-update-request.model';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
  passwordUpdateForm: UntypedFormGroup;
  passwordUpdatePayload: PasswordUpdateRequestModel;

  constructor() { }

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

}
