import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {PostModel} from "../post-model";
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {CommentService} from "../../comment/comment.service";
import {CommentPayload} from "../../comment/comment.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentResponsePayload} from "../../comment/comment-response.payload";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  @Input()
  showCommunity$: boolean = true;
  @Input()
  showComments: boolean = false;
  faCommentAlt = faCommentAlt;
  @Input()
  posts$: PostModel[];
  comments: CommentResponsePayload[];

  postId: number;
  commentForm: FormGroup;
  commentPayload: CommentPayload;

  editorConfig = {
    skin_url: '..\\assets\\skins\\ui\\light',
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

  constructor(private postService: PostService, private router: Router, private commentService: CommentService,
              private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    if (this.showComments) {
      this.getCommentsForPost();
    }
  }

  postDescriptionIsNotEmpty(post: PostModel) {
    return post.description != ""
  }

  postImagesAreNotEmpty(post: PostModel) {
    return post.images && post.images?.length > 0
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentForm.get('text')?.setValue('');

    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data.reverse();
    }, error => {
      throwError(error);
    });
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

  showNavigationArrows(post: PostModel) {
    if (post.images !== undefined) {
      return post.images.length > 1
    } else {
      return false
    }
  }
}
