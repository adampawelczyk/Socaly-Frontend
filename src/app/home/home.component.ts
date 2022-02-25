import { Component, OnInit } from '@angular/core';
import {PostModel} from "../post/post-model";
import {PostService} from "../post/post.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];
  isLoggedIn: boolean;

  constructor(private postService: PostService, private authService: AuthService) {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
