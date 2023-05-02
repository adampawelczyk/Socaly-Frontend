import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { EmailUpdateRequestModel } from '../../user-settings/shared/email-update-request.model';
import { PasswordUpdateRequestModel } from '../../user-settings/shared/password-update-request.model';
import { UserDeleteRequestModel } from '../../user-settings/shared/user-delete-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  getCurrentUsername() {
    return this.localStorage.retrieve('username');
  }

  reloadUserDetails() {
    this.getUserDetails(this.getCurrentUsername()).subscribe(data => {
      this.localStorage.store('userDetails', data);
    })
  }

  getUserDetails(username: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>('http://localhost:8090/api/user/get/' + username)
  }

  getEmail(): Observable<string> {
    return this.httpClient.get('http://localhost:8090/api/user/get/email', {responseType: "text"});
  }

  updateEmail(emailUpdatePayload: EmailUpdateRequestModel): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/update/email', emailUpdatePayload)
  }

  updatePassword(passwordUpdatePayload: PasswordUpdateRequestModel): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/update/password', passwordUpdatePayload);
  }

  isEmailVerified(): Observable<boolean> {
    return this.httpClient.get<boolean>('http://localhost:8090/api/user/is-email-verified');
  }

  isDeleted(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>('http://localhost:8090/api/user/is/deleted/' + username);
  }

  changeProfileImage(imageUrl: string): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/change/profile/image', imageUrl);
  }

  changeProfileBanner(imageUrl: string): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/change/profile/banner', imageUrl);
  }

  changeDescription(description: string): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/change/description', description);
  }

  delete(userDeletePayload: UserDeleteRequestModel): Observable<Object> {
    return this.httpClient.delete('http://localhost:8090/api/user/delete',{body: userDeletePayload});
  }
}
