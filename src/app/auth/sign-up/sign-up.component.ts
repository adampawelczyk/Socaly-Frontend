import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SignUpRequestModel } from '../shared/sign-up-request.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogInComponent } from '../log-in/log-in.component';
import { LogInRequestModel } from '../shared/log-in-request.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../shared/styles.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: UntypedFormGroup;
  signUpPayload: SignUpRequestModel;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              private modal: NgbModal) {
    this.signUpPayload = {
      username: '',
      email: '',
      password: ''
    };

    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  ngOnInit(): void {
    this.signUpForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.signUpPayload = { ...this.signUpForm.value };

    this.authService.signup(this.signUpPayload).subscribe(() => {
      this.handleSuccessfulSignUp();
    }, () => {
      this.handleFailedSignUp();
    });

    this.activeModal.close();
  }

  private handleSuccessfulSignUp() {
    this.activeModal.close();
    this.toastr.success('Signup Successful');
    this.toastr.success('Please check your inbox for activation email');

    const logInPayload: LogInRequestModel = {
      username: this.signUpPayload.username,
      password: this.signUpPayload.password
    };

    this.authService.login(logInPayload).subscribe(() => {});
  }

  private handleFailedSignUp() {
    this.toastr.error('Registration failed! Please try again');
  }

  discardSignup() {
    this.activeModal.close();
  }

  login() {
    this.activeModal.close();
    this.modal.open(LogInComponent);
  }
}
