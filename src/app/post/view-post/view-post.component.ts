import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";
import {ActivatedRoute} from "@angular/router";
import {throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentPayload} from "../../comment/comment.payload";
import {CommentService} from "../../comment/comment.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  postArray: PostModel[] = [];
  communityName = "";

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService) {
    this.postId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.postArray.push(data);
      this.communityName = data.communityName
    }, error => {
      throwError(error);
    });
  }

  exists() {
    return this.communityName !== "";
  }
}
