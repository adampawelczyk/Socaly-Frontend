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

  get(commentId: number): Observable<CommentResponseModel> {
    return this.httpClient.get<CommentResponseModel>(apiURL + '/comment/get/' + commentId);
  }

  getAllByPost(postId: number): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>(apiURL + '/comment/get/all/by-post/' + postId);
  }

  getSubComments(commentId: number): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>( apiURL + '/comment/get/sub-comments/' + commentId);
  }

  create(commentPayload: CommentRequestModel): Observable<Object> {
    return this.httpClient.post(apiURL + '/comment/create', commentPayload);
  }

  edit(commentId: number, text: string): Observable<Object> {
    return this.httpClient.patch(apiURL + '/comment/edit/' + commentId, text);
  }

  getAllByUser(name: string): Observable<CommentResponseModel[]> {
    return this.httpClient.get<CommentResponseModel[]>(apiURL + '/comment/get/all/by-user/' + name);
  }
}
