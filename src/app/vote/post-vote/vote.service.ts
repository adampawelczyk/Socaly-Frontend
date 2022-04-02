import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VoteModel} from "../shared/vote.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(voteModel: VoteModel): Observable<any> {
    return this.http.post('http://localhost:8090/api/votes/', voteModel);
  }
}
