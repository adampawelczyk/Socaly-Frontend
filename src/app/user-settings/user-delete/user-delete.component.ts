import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserDeleteRequestModel } from '../shared/user-delete-request.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user/shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  userDeleteForm: UntypedFormGroup;
  userDeletePayload: UserDeleteRequestModel;

  constructor(private activeModal: NgbActiveModal, private userService: UserService, private authService: AuthService,
              private router: Router) {
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

  discard() {
    this.activeModal.close();
  }

  delete() {
    this.userDeletePayload.username = this.userDeleteForm.get('username')?.value;
    this.userDeletePayload.password = this.userDeleteForm.get('password')?.value;

    this.userService.delete(this.userDeletePayload).subscribe(() => {
      this.activeModal.close();
      this.authService.logout();
      this.router.navigateByUrl('');
    }, error => {
      throwError(error);
    })
  }
}
