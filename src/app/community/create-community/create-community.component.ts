import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunityService } from '../shared/community.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunityRequestModel } from '../shared/community-request.model';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  createCommunityForm: FormGroup;
  communityRequestModel: CommunityRequestModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private communityService: CommunityService, public activeModal: NgbActiveModal) {
    this.createCommunityForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.communityRequestModel = {
      name: '',
      description: ''
    };
  }

  ngOnInit(): void { }

  createCommunity() {
    this.communityRequestModel.name = this.createCommunityForm.get('title')?.value;
    this.communityRequestModel.description = this.createCommunityForm.get('description')?.value;

    this.communityService.createCommunity(this.communityRequestModel).subscribe(() => {
      this.router.navigateByUrl('/communities');
    }, () => {
      console.log('Error occurred');
    });
  }

  discard() {
    this.activeModal.close();
  }
}
