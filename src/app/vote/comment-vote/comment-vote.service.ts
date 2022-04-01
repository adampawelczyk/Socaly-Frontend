import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { CommentVoteModel } from "./comment-vote.model"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CommentVoteService {

  constructor(private httpClient: HttpClient) { }

  vote(commentVotePayload: CommentVoteModel): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/comments/vote', commentVotePayload)
  }
}
