import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../../post/shared/post-response.model';
import { PostService } from '../../post/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/shared/auth.service';
import { CommunityResponseModel } from '../shared/community-response.model';
import { throwError } from 'rxjs';
import { CommunityService } from '../shared/community.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  communityName: string;
  username: string;
  posts: PostResponseModel[] = [];
  postLength: number;
  userCommunities: CommunityResponseModel[] = [];
  userBelongsToCommunity: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private communityService: CommunityService,
              private authService: AuthService,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.communityName = this.activatedRoute.snapshot.params.name;
    this.username = this.localStorage.retrieve('username');

    this.postService.getAllPostsByCommunity(this.communityName).subscribe(posts => {
      this.posts = posts;
      this.postLength = posts.length;
    }, error => {
      throwError(error);
    });

    if (this.username) {
      this.communityService.getAllCommunitiesForUser(this.username).subscribe(communities => {
        this.userCommunities = communities;
        this.userBelongsToCommunity = communities.some(
          community => community.name === this.communityName
        );
      }, error => {
        throwError(error);
      });
    }
  }

  joinCommunity() {
    this.communityService.joinCommunity(this.communityName).subscribe(() => {
      this.userBelongsToCommunity = true;
    },error => {
      throwError(error);
    });
  }

  leaveCommunity() {
    this.communityService.leaveCommunity(this.communityName).subscribe(() => {
      this.userBelongsToCommunity = false;
    }, error => {
      throwError(error);
    });
  }
}
