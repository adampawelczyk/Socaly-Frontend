import { Component, Input, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentResponseModel } from '../shared/comment-response.model';
import { CommentRequestModel } from '../shared/comment-request.model';
import { CommentService } from '../shared/comment.service';
import { editorConfig } from '../../../globals';
import { HighlightService } from '../../shared/highlight.service';
import { AuthService } from '../../auth/shared/auth.service';
import { UserService } from '../../user/shared/user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentResponseModel;
  @Input() postId: number;
  subComments: CommentResponseModel[];
  collapsed = false;
  replyFormIsExpanded = false;
  replyForm: UntypedFormGroup;
  edit = false
  editForm: UntypedFormGroup;
  commentPayload: CommentRequestModel;
  editorConfig = editorConfig;
  userProfileImage: string;
  userIsDeleted: boolean;

  constructor(private commentService: CommentService, private activateRoute: ActivatedRoute, private highlightService: HighlightService,
              private authService: AuthService, private userService: UserService, private localStorage: LocalStorageService) {
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnInit(): void {
    this.editorConfig.placeholder = 'What are your thoughts?';
    this.editorConfig.height = 174;

    this.replyForm = new UntypedFormGroup({
      text: new UntypedFormControl('')
    });

    this.commentPayload = {
      postId: this.comment.postId,
      text: '',
    };

    this.editForm = new UntypedFormGroup({
      text: new UntypedFormControl('')
    });

    this.getSubCommentsForComment(this.comment.id);
    this.initializeEditForm()

    this.userService.getUserProfileImage(this.comment.username).subscribe(data => {
      this.userProfileImage = data;
    });

    this.userService.isDeleted(this.comment.username).subscribe(userIsDeleted => {
      this.userIsDeleted = userIsDeleted;
    });
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
    this.commentPayload.text = this.replyForm.get('text')?.value;
    this.replyForm.get('text')?.setValue('');
    this.commentPayload.parentCommentId = this.comment.id;

    this.commentService.postComment(this.commentPayload).subscribe(() => {
      this.replyFormIsExpanded = false;
      this.getSubCommentsForComment(this.comment.id);
    }, error => {
      throwError(error);
    });
  }

  showEdit() {
    return this.comment.username === this.localStorage.retrieve('username');
  }

  showEditForm() {
    this.edit = !this.edit
  }

  initializeEditForm() {
    this.editForm.get('text')?.setValue(this.comment.text)
  }

  postEdit() {
    this.commentService.editComment(this.comment.id, this.editForm.get('text')?.value).subscribe(() => {
      this.edit = false;
      this.editForm.get('text')?.setValue(this.editForm.get('text')?.value);
      this.commentService.getComment(this.comment.id).subscribe(data => {
        this.comment = data;
      }, error => {
        throwError(error);
      })
    }, error => {
      throwError(error);
    });
  }
}
