import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostVoteModel } from './post-vote.model';
import { CommentVoteModel } from './comment-vote.model';
import { Observable } from 'rxjs';
import { apiURL } from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private httpClient: HttpClient) { }

  voteOnPost(postVotePayload: PostVoteModel): Observable<Object> {
    return this.httpClient.post(apiURL + '/post/vote/', postVotePayload);
  }

  voteOnComment(commentVotePayload: CommentVoteModel): Observable<Object> {
    return this.httpClient.post(apiURL + '/comment/vote', commentVotePayload);
  }
}
