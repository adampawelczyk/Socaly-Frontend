import { Component, OnInit } from '@angular/core';
import { CommunityResponseModel } from '../shared/community-response.model';
import { CommunityService } from '../shared/community.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {
  communities: CommunityResponseModel[];
  filteredCommunities: CommunityResponseModel[];

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe(communities => {
      this.communities = communities;
    }, error => {
      throwError(error);
    });
  }

  sortBy(letter: string) {
    this.filteredCommunities = this.communities.filter(community => community.name.startsWith(letter));
  }
}
