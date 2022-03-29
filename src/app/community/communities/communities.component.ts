import { Component, OnInit } from '@angular/core'
import { CommunityModel } from "../shared/community.model"
import { CommunityService } from "../shared/community.service"
import { throwError } from "rxjs"

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit {
  communities: Array<CommunityModel>

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe(data => {
      this.communities = data
    }, error => {
      throwError(error)
    })
  }
}
