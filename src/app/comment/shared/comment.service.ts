import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentRequestModel } from './comment-request.model';
import { CommentResponseModel } from './comment-response.model';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) { }

  getComment(commentId: number): Observable<CommentResponseModel> {
    return this.httpClient.get<CommentResponseModel>(apiURL + '/comment/get/' + commentId);
  }

  getAllCommentsForPost(postId: number): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>(apiURL + '/comment/get/all/by-post/' + postId);
  }

  getSubCommentsForComment(commentId: number): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>( apiURL + '/comment/get/all/sub-comments/' + commentId);
  }

  postComment(commentPayload: CommentRequestModel): Observable<Object> {
    return this.httpClient.post(apiURL + '/comment/create', commentPayload);
  }

  editComment(commentId: number, text: string): Observable<Object> {
    return this.httpClient.post(apiURL + '/comment/edit/' + commentId, text);
  }

  getAllCommentsByUser(name: string): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>(apiURL + '/comment/get/all/by-user/' + name);
  }
}
