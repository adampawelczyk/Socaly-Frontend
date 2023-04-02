import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { UserSettingsModel } from './user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getUserDetails(username: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>('http://localhost:8090/api/user/get/' + username)
  }

  getUserSettings(): Observable<UserSettingsModel> {
    return this.httpClient.get<UserSettingsModel>('http://localhost:8090/api/user/get/settings')
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
