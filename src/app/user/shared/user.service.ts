import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { EmailUpdateRequestModel } from '../../user-settings/shared/email-update-request.model';

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

  isEmailVerified(): Observable<boolean> {
    return this.httpClient.get<boolean>('http://localhost:8090/api/user/is-email-verified');
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
}
