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
  commentVoteModel: CommentVoteModel;

  constructor(private voteService: VoteService, private authService: AuthService,
              private commentService: CommentService) {
    this.commentVoteModel = {
      voteType: undefined!,
      commentId: undefined!
    };
  }

  ngOnInit(): void { }

  upvoteComment() {
    this.commentVoteModel.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downVoteComment() {
    this.commentVoteModel.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.commentVoteModel.commentId = this.comment.id;
    this.voteService.voteOnComment(this.commentVoteModel).subscribe(() => {
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
