import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangeEmailRequestModel } from '../shared/change-email-request.model';
import { UserService } from '../../user/shared/user.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-email-change',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  changeEmailForm: UntypedFormGroup;
  changeEmailPayload: ChangeEmailRequestModel;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');

    this.changeEmailForm = new UntypedFormGroup({
      password: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.required)
    });

    this.changeEmailPayload = {
      password: '',
      email: ''
    }
  }

  discard(): void {
    this.activeModal.close();
  }

  change(): void {
    this.changeEmailPayload.password = this.changeEmailForm.get('password')?.value;
    this.changeEmailPayload.email = this.changeEmailForm.get('email')?.value;

    this.userService.changeEmail(this.changeEmailPayload).subscribe(() => {

      this.activeModal.close();
    }, error => {
      throwError(error);
    })
  }

  areFieldsEmpty(): boolean {
    return this.changeEmailForm.get('password')?.value === '' || this.changeEmailForm.get('email')?.value === '';
  }
}
