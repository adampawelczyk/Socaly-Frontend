import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../../post/shared/post-response.model';
import {ActivatedRoute, Router} from '@angular/router';
import { PostService } from '../../post/shared/post.service';
import { CommentService } from '../../comment/shared/comment.service';
import { CommentResponseModel } from '../../comment/shared/comment-response.model';
import { UserModel } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { LocalStorageService } from 'ngx-webstorage';

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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private postService: PostService,
              private commentService: CommentService,
              private userService: UserService,
              private localStorage: LocalStorageService) {

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

  unique(comments: CommentResponseModel[]) {
    return new Set(comments.map(comment => comment.postId));
  }

  findPost(postId: number) {
    return this.posts.find(post => post.id == postId)
  }

  getUsername(): string {
    return this.localStorage.retrieve('username');
  }

  goToComment(comment: CommentResponseModel) {
    this.router.navigateByUrl('/post/' + comment.postId + '#' + comment.id);
  }

  showTab() {
    return this.name === this.localStorage.retrieve('username');
  }

  commentsAreEmpty() {
    return this.comments.length === 0;
  }

  postsAreEmpty() {
    return this.posts.length === 0;
  }
}
