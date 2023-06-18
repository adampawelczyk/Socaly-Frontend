import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../shared/community.service';
import { CommunityResponseModel } from '../shared/community-response.model';

@Component({
  selector: 'app-community-sidebar',
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.scss']
})
export class CommunitySidebarComponent implements OnInit {
  communities: CommunityResponseModel[];
  displayViewAll: boolean;

  constructor(private communityService: CommunityService) {
    this.communityService.getAllCommunities().subscribe(communities => {
      if (communities.length >= 4) {
        this.communities = communities.slice(0, 3);
        this.displayViewAll = true;
      } else {
        this.communities = communities;
      }
    });
  }

  ngOnInit(): void { }
}
