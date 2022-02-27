import { Component, OnInit } from '@angular/core';
import {CommunityResponse} from "../shared/community-response";
import {CommunityService} from "../shared/community.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit {
  communities: Array<CommunityResponse>;

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe(data => {
      this.communities = data;
    }, error => {
      throwError(error);
    })
  }

}
