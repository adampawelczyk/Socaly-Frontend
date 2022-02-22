import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/shared/auth.service";
import {UserService} from "../../user/user.service";
import {CommunityResponse} from "../community-response";
import {throwError} from "rxjs";
import {CommunityService} from "../community.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  communityName: string;
  posts: PostModel[];
  postLength: number;
  userCommunities: Array<CommunityResponse>
  belongs: boolean

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private userService: UserService,
              private communityService: CommunityService, private authService: AuthService) {
    this.communityName = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByCommunity(this.communityName).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    })

    this.communityService.getAllCommunitiesForUser(this.authService.getUsername()).subscribe(data => {
      this.userCommunities = data
      this.belongs =  data.some(community => community.name == this.communityName)
    }, error => {
      throwError(error)
    })
  }

  ngOnInit(): void {
  }

}
