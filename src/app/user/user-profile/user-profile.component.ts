import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../../post/shared/post-response.model';
import {ActivatedRoute, Router} from '@angular/router';
import { PostService } from '../../post/shared/post.service';
import { CommentService } from '../../comment/shared/comment.service';
import { CommentResponseModel } from '../../comment/shared/comment-response.model';
import { UserModel } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostResponseModel[];
  comments: CommentResponseModel[];
  postLength: number;
  commentLength: number;
  userDetails: UserModel;
  userIsDeleted: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private postService: PostService, private commentService: CommentService,
              private userService: UserService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.name = this.activatedRoute.snapshot.params.name;

    userService.isDeleted(this.name).subscribe(isDeleted => {
      this.userIsDeleted = isDeleted;
    });

    this.userService.getUserDetails(this.name).subscribe(data => {
      this.userDetails = data;
    })

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void { }
}
