import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../../post/shared/post-response.model';
import { PostService } from '../../post/shared/post.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: PostResponseModel[];
  isLoggedIn: boolean;

  constructor(private postService: PostService,
              private authService: AuthService) {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
