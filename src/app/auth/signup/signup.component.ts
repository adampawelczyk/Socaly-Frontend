import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupRequestPayload} from "./signup-request.payload";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,
              public activeModal: NgbActiveModal) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {
      this.toastr.success('Signup Successful');
      this.toastr.success('Please check your inbox for activation email');
    }, () => {
      this.toastr.error('Registration failed! Please try again');
    });

    this.activeModal.close();
  }

}
