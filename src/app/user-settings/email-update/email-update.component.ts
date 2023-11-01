import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EmailUpdateRequestModel } from '../shared/email-update-request.model';
import { UserService } from '../../user/shared/user.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.scss']
})
export class EmailUpdateComponent implements OnInit {
  emailUpdateForm: UntypedFormGroup;
  emailUpdatePayload: EmailUpdateRequestModel;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');

    this.emailUpdateForm = new UntypedFormGroup({
      password: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.required)
    });

    this.emailUpdatePayload = {
      password: '',
      email: ''
    }
  }

  discard(): void {
    this.activeModal.close();
  }

  updateEmail(): void {
    this.emailUpdatePayload.password = this.emailUpdateForm.get('password')?.value;
    this.emailUpdatePayload.email = this.emailUpdateForm.get('email')?.value;

    this.userService.updateEmail(this.emailUpdatePayload).subscribe(() => {

      this.activeModal.close();
    }, error => {
      throwError(error);
    })
  }

  areFieldsEmpty(): boolean {
    return this.emailUpdateForm.get('password')?.value === '' || this.emailUpdateForm.get('email')?.value === '';
  }
}
