import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunityResponseModel } from './community-response.model';
import { CommunityRequestModel } from './community-request.model';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CommunityResponseModel[]> {
    return this.httpClient.get<CommunityResponseModel[]>(apiURL + '/community/get/all');
  }

  create(communityPayload: CommunityRequestModel): Observable<CommunityResponseModel> {
    return this.httpClient.post<CommunityResponseModel>(apiURL + '/community/create', communityPayload);
  }

  get(name: string): Observable<CommunityResponseModel> {
    return this.httpClient.get<CommunityResponseModel>(apiURL + '/community/get/' + name);
  }

  join(name: string): Observable<Object> {
    return this.httpClient.post(apiURL + '/community/join/' + name, null);
  }

  leave(name: string): Observable<Object> {
    return this.httpClient.post(apiURL + '/community/leave/' + name, null);
  }

  getAllByUser(name: string): Observable<CommunityResponseModel[]> {
    return this.httpClient.get<CommunityResponseModel[]>(apiURL + '/community/get/all/by-user/' + name);
  }
}
