import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommunityResponse} from "./community-response";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  getAllCommunities(): Observable<Array<CommunityResponse>> {
    return this.http.get<Array<CommunityResponse>>('http://localhost:8090/api/community')
  }

  createCommunity(communityResponse: CommunityResponse): Observable<CommunityResponse> {
    return this.http.post<CommunityResponse>('http://localhost:8090/api/community', communityResponse)
  }
}
