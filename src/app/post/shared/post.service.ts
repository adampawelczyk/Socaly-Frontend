import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostResponseModel } from './post-response.model';
import { PostRequestModel } from './post-request.model';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<PostResponseModel[]> {
    return this.httpClient.get<PostResponseModel[]>(apiURL + '/post/get/all');
  }

  create(postPayload: PostRequestModel): Observable<number> {
    return this.httpClient.post<number>(apiURL + '/post/create', postPayload);
  }

  get(id: number): Observable<PostResponseModel> {
    return this.httpClient.get<PostResponseModel>(apiURL + '/post/get/' + id);
  }

  edit(id: number, postPayload: PostRequestModel): Observable<number> {
    return this.httpClient.patch<number>(apiURL + '/post/edit/' + id, postPayload)
  }

  getAllByUser(username: string): Observable<PostResponseModel[]> {
    return this.httpClient.get<PostResponseModel[]>(apiURL + '/post/get/all/by-user/' + username);
  }

  getAllByCommunity(communityName: string): Observable<PostResponseModel[]> {
    return this.httpClient.get<PostResponseModel[]>(apiURL + '/post/get/all/by-community/' + communityName);
  }
}
