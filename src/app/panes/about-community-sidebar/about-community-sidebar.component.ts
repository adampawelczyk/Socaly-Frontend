import { Component, Input, OnInit } from '@angular/core'
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons"
import { CommunityService } from "../../community/shared/community.service"

@Component({
  selector: 'app-about-community-sidebar',
  templateUrl: './about-community-sidebar.component.html',
  styleUrls: ['./about-community-sidebar.component.css']
})
export class AboutCommunitySidebarComponent implements OnInit {
  @Input() communityName: string

  communityDescription: string
  createdDate: string | undefined
  faBirthdayCake = faBirthdayCake

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getCommunityDetails(this.communityName).subscribe(data => {
      this.communityDescription = data.description
      this.createdDate = this.convertTimeToMs(data.createdDate!)
    })
  }

  convertTimeToMs(time: string): string {
    return (parseInt(time) * 1000).toString()
  }
}
