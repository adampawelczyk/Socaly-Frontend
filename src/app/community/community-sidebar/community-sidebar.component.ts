import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../shared/community.service';
import { CommunityResponseModel } from '../shared/community-response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCommunityComponent } from '../create-community/create-community.component';

@Component({
  selector: 'app-community-sidebar',
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.scss']
})
export class CommunitySidebarComponent implements OnInit {
  communities: CommunityResponseModel[];
  displayViewAll: boolean;

  constructor(private communityService: CommunityService, private modal: NgbModal) {
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

  createCommunity() {
    this.modal.open(CreateCommunityComponent);
  }
}
