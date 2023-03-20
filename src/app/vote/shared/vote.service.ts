import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostVoteModel } from './post-vote.model';
import { CommentVoteModel } from './comment-vote.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private httpClient: HttpClient) { }

  voteOnPost(postVotePayload: PostVoteModel): Observable<Object> {
    return this.httpClient.post('http://localhost:8090/api/votes/', postVotePayload);
  }

  voteOnComment(commentVotePayload: CommentVoteModel): Observable<Object> {
    return this.httpClient.post('http://localhost:8090/api/comment/vote', commentVotePayload);
  }
}
