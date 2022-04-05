import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from './login-request.model';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestModel: LoginRequestModel;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, public activeModal: NgbActiveModal, private modal: NgbModal) {
    this.loginRequestModel = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginRequestModel.username = this.loginForm.get('username')?.value;
    this.loginRequestModel.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestModel).subscribe(() => {
      this.router.navigateByUrl('')
      this.toastr.success('Login successful')
    }, () => {
        this.toastr.error('Login failed. Please check your credentials and try again')
    });
  }

  discardLogin() {
    this.activeModal.close();
  }

  signup() {
    this.activeModal.close();
    this.modal.open(SignupComponent);
  }
}
