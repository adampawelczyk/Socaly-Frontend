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
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/posts');
  }

  createPost(postRequestModel: PostRequestModel): Observable<number> {
    return this.http.post<number>('http://localhost:8090/api/posts', postRequestModel);
  }

  getPost(id: number): Observable<PostResponseModel> {
    return this.http.get<PostResponseModel>('http://localhost:8090/api/posts/' + id);
  }

  getAllPostsByUser(username: string): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/posts/by-user/' + username);
  }

  getAllPostsByCommunity(communityName: string): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/posts/by-community/' + communityName);
  }
}
