import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SignupRequestModel } from '../shared/signup-request.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  signupPayload: SignupRequestModel;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,
              public activeModal: NgbActiveModal, private modal: NgbModal) {
    this.signupPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  signup() {
    this.signupPayload.email = this.signupForm.get('email')?.value;
    this.signupPayload.username = this.signupForm.get('username')?.value;
    this.signupPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupPayload).subscribe(() => {
      this.activeModal.close();
      this.toastr.success('Signup Successful');
      this.toastr.success('Please check your inbox for activation email');
    }, () => {
      this.toastr.error('Registration failed! Please try again');
    });

    this.activeModal.close();
  }

  discardSignup() {
    this.activeModal.close();
  }

  login() {
    this.activeModal.close();
    this.modal.open(LoginComponent);
  }
}
