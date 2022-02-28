import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "./post-model";
import {CreatePostPayload} from "../create-post/create-post.payload";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8090/api/posts')
  }

  createPost(postPayload: CreatePostPayload): Observable<Number> {
    return this.http.post<Number>('http://localhost:8090/api/posts', postPayload)
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8090/api/posts/' + id)
  }

  getAllPostsByUser(name: String): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8090/api/posts/by-user/' + name)
  }

  getAllPostsByCommunity(name: String): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8090/api/posts/by-community/' + name)
  }
}
