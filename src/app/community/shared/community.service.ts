import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { CommunityModel } from "./community.model"

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient) { }

  getAllCommunities(): Observable<Array<CommunityModel>> {
    return this.httpClient.get<Array<CommunityModel>>('http://localhost:8090/api/community')
  }

  createCommunity(communityResponse: CommunityModel): Observable<CommunityModel> {
    return this.httpClient.post<CommunityModel>('http://localhost:8090/api/community', communityResponse)
  }

  getCommunityDetails(name: string): Observable<CommunityModel> {
    return this.httpClient.get<CommunityModel>('http://localhost:8090/api/community/' + name)
  }

  join(name: string): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/community/join/' + name)
  }

  leave(name: string): Observable<any> {
    return this.httpClient.get('http://localhost:8090/api/community/leave/' + name)
  }

  getAllCommunitiesForUser(name: string): Observable<Array<CommunityModel>> {
    return this.httpClient.get<Array<CommunityModel>>(
      'http://localhost:8090/api/community/getAllCommunitiesForUser/' + name)
  }
}
