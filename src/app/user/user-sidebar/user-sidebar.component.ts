import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../shared/user.model';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Input() userDetails: UserModel;
  username: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.username = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void { }

  isCurrentUser(): boolean {
    return this.username === this.authService.getUsername()
  }

  uploadProfileImage(event: Event): void {

  }

  uploadProfileBanner(): void {

  }

  openSettings(): void {

  }
}
