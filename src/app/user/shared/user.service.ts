import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { EmailUpdateRequestModel } from '../../user-settings/shared/email-update-request.model';
import { PasswordUpdateRequestModel } from '../../user-settings/shared/password-update-request.model';
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

  reloadUserDetails() {
    this.getUserDetails(this.getCurrentUsername()).subscribe(userDetails => {
      this.localStorage.store('userDetails', userDetails);
    })
  }

  getUserDetails(username: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(apiURL + '/user/get/' + username);
  }

  getUserProfileImage(username: string): Observable<string> {
    return this.httpClient.get(apiURL + '/user/get/profile/image/' + username, {responseType: "text"});
  }

  getEmail(): Observable<string> {
    return this.httpClient.get(apiURL + '/user/get/email', {responseType: "text"});
  }

  updateEmail(emailUpdatePayload: EmailUpdateRequestModel): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/update/email', emailUpdatePayload);
  }

  updatePassword(passwordUpdatePayload: PasswordUpdateRequestModel): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/update/password', passwordUpdatePayload);
  }

  isEmailVerified(): Observable<boolean> {
    return this.httpClient.get<boolean>(apiURL + '/user/is-email-verified');
  }

  isDeleted(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(apiURL + '/user/is/deleted/' + username);
  }

  updateProfileImage(imageUrl: string): Observable<Object> {
    return this.httpClient.patch(apiURL + '/user/update/profile/image', imageUrl);
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
