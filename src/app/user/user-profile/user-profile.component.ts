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
  user: UserModel;
  userIsDeleted: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private postService: PostService, private commentService: CommentService,
              private userService: UserService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.name = this.activatedRoute.snapshot.params.name;

    userService.isDeleted(this.name).subscribe(isDeleted => {
      this.userIsDeleted = isDeleted;
    });

    this.userService.getUser(this.name).subscribe(user => {
      this.user = user;
    })

    this.postService.getAllPostsByUser(this.name).subscribe(posts => {
      this.posts = posts;
      this.postLength = posts.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe(comments => {
      this.comments = comments;
      this.commentLength = comments.length;
    });
  }

  ngOnInit(): void { }

  goHome() {
    this.router.navigateByUrl('');
  }
}
