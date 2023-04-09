import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSettingsModel } from './user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  constructor(private httpClient: HttpClient) { }

  getUserSettings(): Observable<UserSettingsModel> {
    return this.httpClient.get<UserSettingsModel>('http://localhost:8090/api/user/settings/get')
  }

}
