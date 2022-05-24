import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from '../shared/login-request.model';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginPayload: LoginRequestModel;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, public activeModal: NgbActiveModal, private modal: NgbModal) {
    this.loginPayload = {
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
    this.loginPayload.username = this.loginForm.get('username')?.value;
    this.loginPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginPayload).subscribe(() => {
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
