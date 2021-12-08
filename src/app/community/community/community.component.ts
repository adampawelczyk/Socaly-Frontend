import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  communityName: String;
  posts: PostModel[];
  postLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.communityName = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByCommunity(this.communityName).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    })
  }

  ngOnInit(): void {
  }

}
