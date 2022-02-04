import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentPayload} from "./comment.payload";
import {CommentResponsePayload} from "./comment-response.payload";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getComment(commentId: number): Observable<CommentResponsePayload> {
    return this.httpClient.get<CommentResponsePayload>('http://localhost:8090/api/comments/' + commentId)
  }

  getAllCommentsForPost(postId: number): Observable<CommentResponsePayload[]> {
    return this.httpClient.get<CommentResponsePayload[]>('http://localhost:8090/api/comments/by-post/' + postId);
  }

  getSubCommentsForComment(commentId: number): Observable<CommentResponsePayload[]> {
    return this.httpClient.get<CommentResponsePayload[]>('http://localhost:8090/api/comments/subcomments/' + commentId)
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8090/api/comments', commentPayload)
  }

  getAllCommentsByUser(name: String) {
    return this.httpClient.get<CommentResponsePayload[]>('http://localhost:8090/api/comments/by-user/' + name)
  }
}
