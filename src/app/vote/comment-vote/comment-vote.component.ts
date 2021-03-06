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
  styleUrls: ['./comment-vote.component.css']
})
export class CommentVoteComponent implements OnInit {
  @Input() comment: CommentResponseModel;
  commentVotePayload: CommentVoteModel;

  constructor(private voteService: VoteService, private authService: AuthService,
              private commentService: CommentService) {
    this.commentVotePayload = {
      voteType: undefined!,
      commentId: undefined!
    };
  }

  ngOnInit(): void { }

  upvoteComment() {
    this.commentVotePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downVoteComment() {
    this.commentVotePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.commentVotePayload.commentId = this.comment.id;
    this.voteService.voteOnComment(this.commentVotePayload).subscribe(() => {
      this.updateCommentVoteDetails();
    }, error => {
      throwError(error);
    });
  }

  private updateCommentVoteDetails() {
    this.commentService.getComment(this.comment.id).subscribe(data => {
      this.comment = data;
    });
  }
}
