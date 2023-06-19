import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostResponseModel } from '../shared/post-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentService } from '../../comment/shared/comment.service';
import { CommentRequestModel } from '../../comment/shared/comment-request.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommentResponseModel } from '../../comment/shared/comment-response.model';
import { editorConfig } from '../../../globals';
import { HighlightService } from '../../shared/highlight.service';
import { AuthService } from '../../auth/shared/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ClipboardService } from '../../shared/clipboard.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() showCommunityName: boolean = true;
  @Input() showComments: boolean = false;
  @Input() post: PostResponseModel;
  comments: CommentResponseModel[];

  postId: number;
  commentForm: UntypedFormGroup;
  commentPayload: CommentRequestModel;
  editorConfig = editorConfig;
  singleCommentThread = false;

  constructor(private postService: PostService, private router: Router, private commentService: CommentService,
              private activateRoute: ActivatedRoute, private highlightService: HighlightService,
              private authService: AuthService, private localStorage: LocalStorageService, private clipboard: ClipboardService) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.editorConfig.placeholder = 'What are your thoughts?';
    this.editorConfig.height = 174;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.commentForm = new UntypedFormGroup({
      text: new UntypedFormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngAfterViewChecked() {
      this.highlightService.highlightAll();
  }

  ngOnInit(): void {
    if (location.href.includes('#')) {
      this.singleCommentThread = true;
    }
    if (this.showComments) {
      this.getCommentsForPost();
    }
  }

  postDescriptionIsNotEmpty(post: PostResponseModel) {
    return post.description != '';
  }

  postImagesAreNotEmpty(post: PostResponseModel) {
    return post.images && post.images?.length > 0;
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentForm.get('text')?.setValue('');

    this.commentService.postComment(this.commentPayload).subscribe(() => {
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    });
  }

  getCommentsForPost() {
    if (this.singleCommentThread) {
      this.commentService.getComment(Number(location.href.slice(location.href.indexOf('#') + 1))).subscribe(comment => {
        this.comments = [];
        this.comments.push(comment);
      })
    } else {
      this.commentService.getAllCommentsForPost(this.postId).subscribe(comments => {
        this.comments = comments.reverse();
      }, error => {
        throwError(error);
      });
    }

  }

  goToPost(id: number): void {
    let userSettings = this.localStorage.retrieve('userSettings')

    if (this.authService.isLoggedIn() && userSettings.openPostsInNewTab) {
      const url = this.router.serializeUrl(this.router.createUrlTree(['/post/' + id]));
      window.open(url, '_blank');
    } else {
      this.router.navigateByUrl('/post/' + id);
    }
  }

  showCarouselNavigationControls(post: PostResponseModel) {
    if (post.images !== undefined) {
      return post.images.length > 1;
    } else {
      return false;
    }
  }

  copyLink() {
    let url = location.href;

    if (!/\d$/.test(url)) {
      url += 'post/' + this.post.id;
    }

    this.clipboard.writeText(url);
  }

  seeFullDiscussion() {
    this.singleCommentThread = false;
    location.assign(location.href.slice(0, location.href.indexOf('#')));
  }
}
