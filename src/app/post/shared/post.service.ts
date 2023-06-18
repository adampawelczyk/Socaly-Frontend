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

  getAllPosts(): Observable<PostResponseModel[]> {
    return this.httpClient.get<PostResponseModel[]>(apiURL + '/post/get/all');
  }

  createPost(postPayload: PostRequestModel): Observable<number> {
    return this.httpClient.post<number>(apiURL + '/post/create', postPayload);
  }

  getPost(id: number): Observable<PostResponseModel> {
    return this.httpClient.get<PostResponseModel>(apiURL + '/post/get/' + id);
  }

  getAllPostsByUser(username: string): Observable<PostResponseModel[]> {
    return this.httpClient.get<PostResponseModel[]>(apiURL + '/post/get/all/by-user/' + username);
  }

  getAllPostsByCommunity(communityName: string): Observable<PostResponseModel[]> {
    return this.httpClient.get<PostResponseModel[]>(apiURL + '/post/get/all/by-community/' + communityName);
  }
}
