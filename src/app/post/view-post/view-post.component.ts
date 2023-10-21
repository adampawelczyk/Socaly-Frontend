import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../shared/post-response.model';
import { PostService } from '../shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: PostResponseModel;
  communityName = '';

  constructor(private postService: PostService,
              private activateRoute: ActivatedRoute) {
    this.postId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById(): void {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
      this.communityName = post.communityName;
    }, error => {
      throwError(error);
    });
  }

  exists() {
    return this.communityName !== '';
  }
}
