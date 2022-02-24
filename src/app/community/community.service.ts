import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommunityResponse} from "./community-response";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient) { }

  getAllCommunities(): Observable<Array<CommunityResponse>> {
    return this.httpClient.get<Array<CommunityResponse>>('http://localhost:8090/api/community')
  }

  createCommunity(communityResponse: CommunityResponse): Observable<CommunityResponse> {
    return this.httpClient.post<CommunityResponse>('http://localhost:8090/api/community', communityResponse)
  }

  getCommunityDetails(name: string): Observable<CommunityResponse> {
    return this.httpClient.get<CommunityResponse>('http://localhost:8090/api/community/' + name)
  }

  join(name: string): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/community/join/' + name)
  }

  leave(name: string): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/community/leave/' + name)
  }

  getAllCommunitiesForUser(name: string): Observable<Array<CommunityResponse>> {
    return this.httpClient.get<Array<CommunityResponse>>(
      'http://localhost:8090/api/community/getAllCommunitiesForUser/' + name)
  }
}
