import {Component, Input, OnInit} from '@angular/core'
import {CommentPayload} from "../../comment/comment.payload"
import {CommentService} from "../../comment/comment.service"
import {ViewEncapsulation} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms"
import {throwError} from "rxjs"
import {ActivatedRoute} from "@angular/router"
import {AuthService} from "../../auth/shared/auth.service"

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentPayload
  @Input() postId: number
  subComments: CommentPayload[]
  collapsed = false
  reply = false
  replyForm: FormGroup
  replyPayload: CommentPayload

  editorConfig = {
    skin_url: '..\\assets\\skins\\ui\\light',
    icons: 'material',
    branding: false,
    height: 174,
    placeholder: "What are your thoughts?",
    menubar: false,
    plugins: [
      'advlist lists charmap print preview anchor emoticons paste',
      'searchreplace visualblocks fullscreen insertdatetime link'
    ],
    toolbar:
      'formatselect | bold italic link strikethrough superscript bullist numlist emoticons',
    link_title: false,
    target_list: false,
    default_link_target:"_blank",
    link_context_toolbar: true,
    codesample_content_css: '..\\assets\\prism.css',
  }

  constructor(private commentService: CommentService, private activateRoute: ActivatedRoute, private authService: AuthService) {
    this.postId = this.activateRoute.snapshot.params.id

    this.replyForm = new FormGroup({
      text: new FormControl('')
    })

    this.replyPayload = {
      postId: this.postId,
      text: '',
    }
  }

  ngOnInit(): void {
    this.getSubCommentsForComment(this.comment.id)
  }

  private getSubCommentsForComment(commentId: number | undefined) {
    if (commentId !== undefined) {
      this.commentService.getSubCommentsForComment(commentId).subscribe(data => {
        this.subComments = data
      })
    }
  }

  hasSubComments() {
    return this.subComments !== undefined
  }

  collapse() {
    this.collapsed = true
  }

  extend() {
    this.collapsed = false
  }

  showReplyForm() {
    this.reply = !this.reply
  }

  postReply() {
    this.replyPayload.text = this.replyForm.get('text')?.value
    this.replyForm.get('text')?.setValue('')
    this.replyPayload.parentCommentId = this.comment.id

    this.commentService.postComment(this.replyPayload).subscribe(data => {
      this.reply = false
      this.getSubCommentsForComment(this.comment.id)
    }, error => {
      throwError(error)
    })
  }
}
