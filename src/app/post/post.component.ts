import { Component, Input, OnInit } from '@angular/core';
import { PostService } from "./shared/post.service";
import { PostResponseModel } from "./shared/post-response.model";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { CommentService } from "../comment/shared/comment.service";
import { CommentRequestModel } from "../comment/shared/comment-request.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommentResponseModel } from "../comment/shared/comment-response.model";
import { editorConfig } from "../../globals";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() showCommunityName: boolean = true;
  @Input() showComments: boolean = false;
  @Input() posts$: PostResponseModel[];
  faCommentAlt = faCommentAlt;
  comments: CommentResponseModel[];

  postId: number;
  commentForm: FormGroup;
  commentPayload: CommentRequestModel;
  editorConfig = editorConfig;

  constructor(private postService: PostService, private router: Router, private commentService: CommentService,
              private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.editorConfig.placeholder = "What are your thoughts?"
    this.editorConfig.height = 174;

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

  postDescriptionIsNotEmpty(post: PostResponseModel) {
    return post.description != ""
  }

  postImagesAreNotEmpty(post: PostResponseModel) {
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

  showNavigationArrows(post: PostResponseModel) {
    if (post.images !== undefined) {
      return post.images.length > 1
    } else {
      return false
    }
  }
}
