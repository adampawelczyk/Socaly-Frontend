import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { ChangeEmailRequestModel } from '../../user-settings/shared/change-email-request.model';
import { ChangePasswordRequestModel } from '../../user-settings/shared/change-password-request.model';
import { UserDeleteRequestModel } from '../../user-settings/shared/user-delete-request.model';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  getCurrentUsername() {
    return this.localStorage.retrieve('username');
  }

  reloadUser() {
    this.get(this.getCurrentUsername()).subscribe(user => {
      this.localStorage.store('user', user);
    })
  }

  get(username: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(apiURL + '/user/get/' + username);
  }

  getProfileImage(username: string): Observable<string> {
    return this.httpClient.get(apiURL + '/user/get/profile/image/' + username, {responseType: "text"});
  }

  getEmail(): Observable<string> {
    return this.httpClient.get(apiURL + '/user/get/email', {responseType: "text"});
  }

  changeEmail(changeEmailPayload: ChangeEmailRequestModel): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/change/email', changeEmailPayload);
  }

  changePassword(passwordChangePayload: ChangePasswordRequestModel): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/change/password', passwordChangePayload);
  }

  isEmailVerified(): Observable<boolean> {
    return this.httpClient.get<boolean>(apiURL + '/user/is-email-verified');
  }

  isDeleted(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(apiURL + '/user/is/deleted/' + username);
  }

  changeProfileImage(imageUrl: string): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/change/profile/image', imageUrl);
  }

  changeProfileBanner(imageUrl: string): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/change/profile/banner', imageUrl);
  }

  changeDescription(description: string): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/change/description', description);
  }

  delete(userDeletePayload: UserDeleteRequestModel): Observable<Object> {
    return this.httpClient.delete(apiURL + '/user/delete',{body: userDeletePayload});
  }
}
