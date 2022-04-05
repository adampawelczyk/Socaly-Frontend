import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentRequestModel } from './comment-request.model';
import { CommentResponseModel } from './comment-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) { }

  getComment(commentId: number): Observable<CommentResponseModel> {
    return this.httpClient.get<CommentResponseModel>('http://localhost:8090/api/comments/' + commentId);
  }

  getAllCommentsForPost(postId: number): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>('http://localhost:8090/api/comments/by-post/' + postId);
  }

  getSubCommentsForComment(commentId: number): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>('http://localhost:8090/api/comments/subcomments/' + commentId);
  }

  postComment(commentPayload: CommentRequestModel): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8090/api/comments', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentResponseModel[]>('http://localhost:8090/api/comments/by-user/' + name);
  }
}
