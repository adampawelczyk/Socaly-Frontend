import { Component, Input, OnInit } from '@angular/core';
import { CommentResponseModel } from '../../comment/shared/comment-response.model';
import { CommentVoteModel } from '../shared/comment-vote.model';
import { VoteService } from '../shared/vote.service';
import { AuthService } from '../../auth/shared/auth.service';
import { CommentService } from '../../comment/shared/comment.service';
import { VoteType } from '../shared/vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-comment-vote',
  templateUrl: './comment-vote.component.html',
  styleUrls: ['../shared/vote.component.scss']
})
export class CommentVoteComponent implements OnInit {
  @Input() comment: CommentResponseModel;
  commentVotePayload: CommentVoteModel;

  constructor(private voteService: VoteService,
              private authService: AuthService,
              private commentService: CommentService) {
    this.commentVotePayload = {
      voteType: undefined!,
      commentId: undefined!
    };
  }

  ngOnInit(): void { }

  upVote(): void {
    this.setVoteType(VoteType.UPVOTE);
    this.vote();
  }

  downVote(): void {
    this.setVoteType(VoteType.DOWNVOTE);
    this.vote();
  }

  private setVoteType(voteType: VoteType): void {
    this.commentVotePayload.voteType = voteType;
  }

  private vote(): void {
    this.commentVotePayload.commentId = this.comment.id;
    this.voteService.voteOnComment(this.commentVotePayload).subscribe(() => {
      this.updateCommentVoteDetails();
    }, error => {
      throwError(error);
    });
  }

  private updateCommentVoteDetails(): void {
    this.commentService.get(this.comment.id).subscribe(comment => {
      this.comment = comment;
    });
  }
}
