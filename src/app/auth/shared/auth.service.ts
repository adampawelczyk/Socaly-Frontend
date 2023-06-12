import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequestModel } from './sign-up-request.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LogInRequestModel } from './log-in-request.model';
import { LogInResponseModel } from './log-in-response.model';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../../user/shared/user.service';
import { UserSettingsService } from '../../user-settings/shared/user-settings.service';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInSubject = new BehaviorSubject<boolean>(false);
  usernameSubject = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private userService: UserService,
              private userSettingsService: UserSettingsService) { }

  signup(signupPayload: SignUpRequestModel): Observable<any> {
    return this.httpClient.post(apiURL + '/auth/sign-up', signupPayload, {responseType: 'text'});
  }

  login(loginPayload: LogInRequestModel): Observable<boolean> {
    return this.httpClient.post<LogInResponseModel>(apiURL + '/auth/log-in', loginPayload)
      .pipe(map(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('username', response.username);
        this.localStorage.store('refreshToken', response.refreshToken);
        this.localStorage.store('expiresAt', response.expiresAt);

        this.loggedInSubject.next(true);
        this.usernameSubject.next(response.username);

        this.userService.getUserDetails(response.username).subscribe(userDetails => {
          this.localStorage.store('userDetails', userDetails);
        })

        this.userSettingsService.getUserSettings().subscribe(data => {
          this.localStorage.store('userSettings', data);
        })

        return true;
      }));
  }

  refreshToken() {
    let refreshTokenPayload = {
      username: this.localStorage.retrieve('username'),
      refreshToken: this.localStorage.retrieve('refreshToken')
    };

    return this.httpClient.post<LogInResponseModel>(apiURL + '/auth/refresh-token',refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    let refreshTokenPayload = {
      username: this.localStorage.retrieve('username'),
      refreshToken: this.localStorage.retrieve('refreshToken')
    };

    this.httpClient.post(apiURL + '/auth/log-out', refreshTokenPayload, {responseType: 'text'})
      .subscribe(() => { }, error => {
        throwError(error);
      });

    this.localStorage.clear();

    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.localStorage.retrieve('authenticationToken') != null;
  }
}
