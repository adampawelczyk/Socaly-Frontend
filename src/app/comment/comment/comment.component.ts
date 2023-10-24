import { Component, Input, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
import { ClipboardService } from '../../shared/clipboard.service';

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
  replyFormIsExpanded = false;
  replyForm: FormGroup;
  edit = false
  editForm: FormGroup;
  commentPayload: CommentRequestModel;
  editorConfig = editorConfig;
  userProfileImage: string;
  userIsDeleted: boolean;

  constructor(private commentService: CommentService,
              private activateRoute: ActivatedRoute,
              private highlightService: HighlightService,
              private authService: AuthService,
              private userService: UserService,
              private localStorage: LocalStorageService,
              private clipboard: ClipboardService) { }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnInit(): void {
    this.editorConfig.placeholder = 'What are your thoughts?';
    this.editorConfig.height = 174;

    this.replyForm = new FormGroup({
      text: new FormControl('')
    });

    this.commentPayload = {
      postId: this.comment.postId,
      text: '',
    };

    this.editForm = new FormGroup({
      text: new FormControl('')
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

  private getSubCommentsForComment(commentId: number | undefined): void {
    if (commentId !== undefined) {
      this.commentService.getSubCommentsForComment(commentId).subscribe(subComments => {
        this.subComments = subComments;
      });
    }
  }

  hasSubComments(): boolean {
    return this.subComments !== undefined;
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
      this.commentService.getComment(this.comment.id).subscribe(comment => {
        this.comment = comment;
      }, error => {
        throwError(error);
      })
    }, error => {
      throwError(error);
    });
  }

  copyLink() {
    let url = location.href;

    if (url.includes('#')) {
      url = url.slice(0, location.href.indexOf('#'));
    }

    url += '#' + this.comment.id;

    this.clipboard.writeText(url);
  }
}
