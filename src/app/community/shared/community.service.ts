import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunityResponseModel } from './community-response.model';
import { CommunityRequestModel } from './community-request.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  constructor(private httpClient: HttpClient) { }

  getAllCommunities(): Observable<CommunityResponseModel[]> {
    return this.httpClient.get<CommunityResponseModel[]>('http://localhost:8090/api/community');
  }

  createCommunity(communityRequest: CommunityRequestModel): Observable<CommunityResponseModel> {
    return this.httpClient.post<CommunityResponseModel>('http://localhost:8090/api/community', communityRequest);
  }

  getCommunityDetails(name: string): Observable<CommunityResponseModel> {
    return this.httpClient.get<CommunityResponseModel>('http://localhost:8090/api/community/' + name);
  }

  joinCommunity(name: string): Observable<Object> {
    return this.httpClient.get('http://localhost:8090/api/community/join/' + name);
  }

  leaveCommunity(name: string): Observable<Object> {
    return this.httpClient.get('http://localhost:8090/api/community/leave/' + name);
  }

  getAllCommunitiesForUser(name: string): Observable<CommunityResponseModel[]> {
    return this.httpClient.get<CommunityResponseModel[]>('http://localhost:8090/api/community/getAllCommunitiesForUser/' + name);
  }
}
