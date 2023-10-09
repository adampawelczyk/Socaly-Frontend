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
  sortingLetter: string;

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.loadCommunities();
  }

  private loadCommunities() {
    this.communityService.getAllCommunities().subscribe(communities => {
      this.communities = communities;
      this.sortingLetter = 'a';
      this.sortBy(this.sortingLetter);
    }, error => {
      throwError(error);
    });
  }

  sortBy(letter: string) {
    this.sortingLetter = letter;

    if (letter == '#') {
      this.filteredCommunities = this.communities.filter(community => community.name.match(/^\d/));
    } else {
      this.filteredCommunities = this.communities.filter(community => community.name.startsWith(letter));
    }

    this.filteredCommunities = this.filteredCommunities.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
