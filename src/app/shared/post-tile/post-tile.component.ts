import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {PostModel} from "../post-model";
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {CommentService} from "../../comment/comment.service";
import {CommentPayload} from "../../comment/comment.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  comments: CommentPayload[];
  dataModel: string

  postId: number;
  commentForm: FormGroup;
  commentPayload: CommentPayload;

  editorConfig = {
    skin_url: '..\\assets\\skins\\ui\\light',
    icons: 'material',
    branding: false,
    height: 174,
    placeholder: "What are your thoughts?",
    menubar: false,
    plugins: [
      'advlist lists charmap print preview anchor emoticons',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste codesample link toc'
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
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
