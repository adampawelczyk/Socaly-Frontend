import { Component, Input, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentResponseModel } from './shared/comment-response.model';
import { CommentRequestModel } from './shared/comment-request.model';
import { CommentService } from './shared/comment.service';
import { editorConfig } from '../../globals';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentResponseModel;
  @Input() postId: number;
  subComments: CommentResponseModel[];
  collapsed = false;
  replyFormIsExpanded = false;
  replyForm: FormGroup;
  commentRequest: CommentRequestModel;
  editorConfig = editorConfig;

  constructor(private commentService: CommentService, private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.editorConfig.placeholder = "What are your thoughts?";
    this.editorConfig.height = 174;

    this.replyForm = new FormGroup({
      text: new FormControl('')
    });

    this.commentRequest = {
      postId: this.postId,
      text: '',
    };
  }

  ngOnInit(): void {
    this.getSubCommentsForComment(this.comment.id);
  }

  private getSubCommentsForComment(commentId: number | undefined) {
    if (commentId !== undefined) {
      this.commentService.getSubCommentsForComment(commentId).subscribe(data => {
        this.subComments = data;
      });
    }
  }

  hasSubComments() {
    return this.subComments !== undefined;
  }

  collapse() {
    this.collapsed = true;
  }

  extend() {
    this.collapsed = false;
  }

  showReplyForm() {
    this.replyFormIsExpanded = !this.replyFormIsExpanded;
  }

  postReply() {
    this.commentRequest.text = this.replyForm.get('text')?.value;
    this.replyForm.get('text')?.setValue('');
    this.commentRequest.parentCommentId = this.comment.id;

    this.commentService.postComment(this.commentRequest).subscribe(() => {
      this.replyFormIsExpanded = false;
      this.getSubCommentsForComment(this.comment.id);
    }, error => {
      throwError(error);
    });
  }
}
