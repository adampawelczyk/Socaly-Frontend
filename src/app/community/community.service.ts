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
    return this.http.get<CommunityResponse>('http://localhost:8090/api/community/' + name)
  }
}
