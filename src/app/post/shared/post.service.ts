import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostResponseModel } from './post-response.model';
import { PostRequestModel } from './post-request.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/post/get/all');
  }

  createPost(postPayload: PostRequestModel): Observable<number> {
    return this.http.post<number>('http://localhost:8090/api/post/create', postPayload);
  }

  getPost(id: number): Observable<PostResponseModel> {
    return this.http.get<PostResponseModel>('http://localhost:8090/api/post/get/' + id);
  }

  getAllPostsByUser(username: string): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/post/get/all/by-user/' + username);
  }

  getAllPostsByCommunity(communityName: string): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/post/get/all/by-community/' + communityName);
  }
}
