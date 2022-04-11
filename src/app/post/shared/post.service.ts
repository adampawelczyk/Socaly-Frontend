import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PostResponseModel } from "./post-response.model";
import { PostRequestModel } from "./post-request.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostResponseModel>> {
    return this.http.get<Array<PostResponseModel>>('http://localhost:8090/api/posts')
  }

  createPost(postPayload: PostRequestModel): Observable<Number> {
    return this.http.post<Number>('http://localhost:8090/api/posts', postPayload)
  }

  getPost(id: number): Observable<PostResponseModel> {
    return this.http.get<PostResponseModel>('http://localhost:8090/api/posts/' + id)
  }

  getAllPostsByUser(name: String): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/posts/by-user/' + name)
  }

  getAllPostsByCommunity(name: String): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>('http://localhost:8090/api/posts/by-community/' + name)
  }
}
