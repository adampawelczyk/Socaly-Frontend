import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { CommentVotePayload } from "./comment-vote.payload"
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CommentVoteService {

  constructor(private httpClient: HttpClient) { }

  vote(commentVotePayload: CommentVotePayload): Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/comments/vote', commentVotePayload)
  }
}
