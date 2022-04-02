import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PostVoteModel } from "./post-vote.model";
import { CommentVoteModel } from "./comment-vote.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  voteOnPost(voteModel: PostVoteModel): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/votes/', voteModel);
  }

  voteOnComment(commentVoteModel: CommentVoteModel): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/comments/vote', commentVoteModel)
  }
}
