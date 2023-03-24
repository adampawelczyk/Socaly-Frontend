import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getUserDetails(username: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>('http://localhost:8090/api/user/get/' + username)
  }

  changeProfileImage(imageUrl: string): Observable<Object> {
    return this.httpClient.patch('http://localhost:8090/api/user/change/profile/image', imageUrl);
  }
}
