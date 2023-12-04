import { Component, Input, OnInit } from '@angular/core';
import { CommunityService } from '../shared/community.service';

@Component({
  selector: 'app-about-community-sidebar',
  templateUrl: './about-community-sidebar.component.html',
  styleUrls: ['./about-community-sidebar.component.scss']
})
export class AboutCommunitySidebarComponent implements OnInit {
  @Input() communityName: string;
  communityDescription: string;
  createdDate: string | undefined;

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.get(this.communityName).subscribe(community => {
      this.communityDescription = community.description;
      this.createdDate = this.convertTimeToMs(community.createdDate!);
    });
  }

  convertTimeToMs(time: string): string {
    return (parseInt(time) * 1000).toString();
  }
}
