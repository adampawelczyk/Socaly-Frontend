import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { VoteModel } from "./vote.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  voteOnPost(voteModel: VoteModel): Observable<any> {
    return this.http.post('http://localhost:8090/api/votes/', voteModel);
  }

  voteOnComment(voteModel: VoteModel): Observable<any> {
    return this.http.post('http://localhost:8090/api/comments/vote', voteModel)
  }
}
