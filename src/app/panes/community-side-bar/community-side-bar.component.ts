import { Component, OnInit } from '@angular/core'
import { CommunityService } from "../../community/shared/community.service"
import { CommunityResponseModel } from "../../community/shared/community-response.model"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { CreateCommunityComponent } from "../../community/create-community/create-community.component"

@Component({
  selector: 'app-community-side-bar',
  templateUrl: './community-side-bar.component.html',
  styleUrls: ['./community-side-bar.component.css']
})
export class CommunitySideBarComponent implements OnInit {
  communities: Array<CommunityResponseModel>
  displayViewAll: boolean

  constructor(private communityService: CommunityService, private modal: NgbModal) {
    this.communityService.getAllCommunities().subscribe(data => {
      if (data.length >= 4) {
        this.communities = data.slice(0, 3)
        this.displayViewAll = true
      } else {
        this.communities = data
      }
    })
  }

  ngOnInit(): void {
  }

  createCommunity() {
    this.modal.open(CreateCommunityComponent)
  }
}
