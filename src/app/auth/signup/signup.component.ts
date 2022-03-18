import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { SignupModel } from "./signup.model"
import { AuthService } from "../shared/auth.service"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { LoginComponent } from "../login/login.component"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  signupRequestPayload: SignupModel

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,
              public activeModal: NgbActiveModal, private modal: NgbModal) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value
    this.signupRequestPayload.username = this.signupForm.get('username')?.value
    this.signupRequestPayload.password = this.signupForm.get('password')?.value

    this.authService.signup(this.signupRequestPayload).subscribe(() => {
      this.toastr.success('Signup Successful')
      this.toastr.success('Please check your inbox for activation email')
    }, () => {
      this.toastr.error('Registration failed! Please try again')
    })

    this.activeModal.close()
  }

  discardSignup() {
    this.activeModal.close()
  }

  login() {
    this.activeModal.close()
    this.modal.open(LoginComponent)
  }
}
