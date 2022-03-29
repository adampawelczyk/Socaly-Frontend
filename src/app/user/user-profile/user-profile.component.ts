import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../post/shared/post-model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../post/shared/post.service";
import {CommentService} from "../../comment/shared/comment.service";
import {CommentResponseModel} from "../../comment/shared/comment-response.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostModel[];
  comments: CommentResponseModel[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
  }

}
