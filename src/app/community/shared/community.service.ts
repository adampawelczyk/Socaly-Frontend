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

  getAllCommunities(): Observable<CommunityResponseModel[]> {
    return this.httpClient.get<CommunityResponseModel[]>(apiURL + '/community/get/all');
  }

  createCommunity(communityPayload: CommunityRequestModel): Observable<CommunityResponseModel> {
    return this.httpClient.post<CommunityResponseModel>(apiURL + '/community/create', communityPayload);
  }

  getCommunityDetails(name: string): Observable<CommunityResponseModel> {
    return this.httpClient.get<CommunityResponseModel>(apiURL + '/community/get/' + name);
  }

  joinCommunity(name: string): Observable<Object> {
    return this.httpClient.get(apiURL + '/community/join/' + name);
  }

  leaveCommunity(name: string): Observable<Object> {
    return this.httpClient.get(apiURL + '/community/leave/' + name);
  }

  getAllCommunitiesForUser(name: string): Observable<CommunityResponseModel[]> {
    return this.httpClient.get<CommunityResponseModel[]>(apiURL + '/community/get/all/by-user/' + name);
  }
}
