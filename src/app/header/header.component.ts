import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { LogInComponent } from '../auth/log-in/log-in.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  username: string;

  constructor(private authService: AuthService,
              private router: Router,
              private modal: NgbModal,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe({
      next: (loggedIn) => this.loggedIn = loggedIn
    });

    this.authService.usernameSubject.subscribe({
      next: (username) => this.username = username
    });

    this.loggedIn = this.authService.isLoggedIn();
    this.username = this.localStorage.retrieve('username');
  }

  signUp() {
    this.modal.open(SignUpComponent);
  }

  login() {
    this.modal.open(LogInComponent);
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user/' + this.username);
  }

  goToUserSettings() {
    this.router.navigateByUrl('/settings/account');
  }

  goToCommunityDirectory() {
    this.router.navigateByUrl('/communities');
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('');
  }
}
