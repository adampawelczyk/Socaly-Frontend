import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.loggedIn.subscribe({
      next: (isLoggedIn) => this.isLoggedIn = isLoggedIn
    });
    this.username = this.authService.getUsername();
  }

  signup() {
    this.modal.open(SignupComponent);
  }

  login() {
    this.modal.open(LoginComponent);
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  goToUserSettings() {
    this.router.navigateByUrl('/settings/account');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
