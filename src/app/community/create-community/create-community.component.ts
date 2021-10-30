import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommunityService} from "../community.service";
import {CommunityResponse} from "../community-response";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  createCommunityForm: FormGroup;
  communityResponse: CommunityResponse;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private communityService: CommunityService) {
    this.createCommunityForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.communityResponse = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createCommunity() {
    this.communityResponse.name = this.createCommunityForm.get('title')?.value;
    this.communityResponse.description = this.createCommunityForm.get('description')?.value;

    this.communityService.createCommunity(this.communityResponse).subscribe(data => {
      this.router.navigateByUrl('/communities');
    }, error => {
      console.log('Error occurred');
    })
  }

}
