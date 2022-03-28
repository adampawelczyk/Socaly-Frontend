import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { CommunityService } from "../shared/community.service"
import { CommunityModel } from "../shared/community.model"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  createCommunityForm: FormGroup
  communityResponse: CommunityModel
  title = new FormControl('')
  description = new FormControl('')

  constructor(private router: Router, private communityService: CommunityService, public activeModal: NgbActiveModal) {
    this.createCommunityForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
    this.communityResponse = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  createCommunity() {
    this.communityResponse.name = this.createCommunityForm.get('title')?.value
    this.communityResponse.description = this.createCommunityForm.get('description')?.value

    this.communityService.createCommunity(this.communityResponse).subscribe(() => {
      this.router.navigateByUrl('/communities')
    }, () => {
      console.log('Error occurred')
    })
  }

  discard() {
    this.activeModal.close()
  }

}
