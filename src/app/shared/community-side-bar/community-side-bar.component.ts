import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../community/community.service";
import {CommunityResponse} from "../../community/community-response";

@Component({
  selector: 'app-community-side-bar',
  templateUrl: './community-side-bar.component.html',
  styleUrls: ['./community-side-bar.component.css']
})
export class CommunitySideBarComponent implements OnInit {
  communities: Array<CommunityResponse>
  displayViewAll: boolean;

  constructor(private communityService: CommunityService) {
    this.communityService.getAllCommunities().subscribe(data => {
      if (data.length >= 4) {
        this.communities = data.slice(0, 3);
        this.displayViewAll = true;
      } else {
        this.communities = data;
      }
    })
  }

  ngOnInit(): void {
  }

}
