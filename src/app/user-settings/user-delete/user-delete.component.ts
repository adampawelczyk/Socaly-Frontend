import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserDeleteRequestModel } from '../shared/user-delete-request.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  userDeleteForm: UntypedFormGroup;
  userDeletePayload: UserDeleteRequestModel;

  constructor() {
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');

    this.userDeleteForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });

    this.userDeletePayload= {
      username: '',
      password: ''
    };
  }
}
