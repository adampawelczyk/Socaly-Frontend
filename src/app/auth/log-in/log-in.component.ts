import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LogInRequestModel } from '../shared/log-in-request.model';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss', '../shared/styles.scss']
})
export class LogInComponent implements OnInit {
  logInForm: UntypedFormGroup;
  logInPayload: LogInRequestModel;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, public activeModal: NgbActiveModal, private modal: NgbModal) {
    this.logInPayload = {
      username: '',
      password: ''
    };

    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  ngOnInit(): void {
    this.logInForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  login() {
    this.logInPayload.username = this.logInForm.get('username')?.value;
    this.logInPayload.password = this.logInForm.get('password')?.value;

    this.authService.login(this.logInPayload).subscribe(() => {
      this.activeModal.close();
      this.router.navigateByUrl('');
      this.toastr.success('Login successful');
    }, () => {
        this.toastr.error('Login failed. Please check your credentials and try again');
    });
  }

  discardLogin() {
    this.activeModal.close();
  }

  signup() {
    this.activeModal.close();
    this.modal.open(SignUpComponent);
  }
}