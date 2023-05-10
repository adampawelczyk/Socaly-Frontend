import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestModel } from './signup-request.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginRequestModel } from './login-request.model';
import { LoginResponseModel } from './login-response.model';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../../user/shared/user.service';
import { UserSettingsService } from '../../user-settings/shared/user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInSubject = new BehaviorSubject<boolean>(false);
  username = new BehaviorSubject<string>("");

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  };

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private userService: UserService,
              private userSettingsService: UserSettingsService) { }

  signup(signupPayload: SignupRequestModel): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/auth/sign-up', signupPayload, {responseType: 'text'});
  }

  login(loginPayload: LoginRequestModel): Observable<boolean> {
    return this.httpClient.post<LoginResponseModel>('http://localhost:8090/api/auth/log-in', loginPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedInSubject.next(true);
        this.username.next(data.username);

        this.userService.getUserDetails(data.username).subscribe(data => {
          this.localStorage.store('userDetails', data);
        })

        this.userSettingsService.getUserSettings().subscribe(data => {
          this.localStorage.store('userSettings', data);
        })

        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponseModel>('http://localhost:8090/api/auth/refresh-token', this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8090/api/auth/log-out', this.refreshTokenPayload, {responseType: 'text'})
      .subscribe(() => { }, error => {
        throwError(error);
      });

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('userDetails');
    this.localStorage.clear('userSettings');

    this.loggedInSubject.next(false);
  }

  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  getUserDetails() {
    return this.localStorage.retrieve('userDetails');
  }

  getUserSettings() {
    return this.localStorage.retrieve('userSettings');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
