import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunityService } from '../shared/community.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunityRequestModel } from '../shared/community-request.model';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {
  createCommunityForm: UntypedFormGroup;
  communityPayload: CommunityRequestModel;
  title = new UntypedFormControl('');
  description = new UntypedFormControl('');

  constructor(private router: Router, private communityService: CommunityService, public activeModal: NgbActiveModal) {
    this.createCommunityForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required)
    });

    this.communityPayload = {
      name: '',
      description: ''
    };
  }

  ngOnInit(): void { }

  createCommunity() {
    this.communityPayload.name = this.createCommunityForm.get('title')?.value;
    this.communityPayload.description = this.createCommunityForm.get('description')?.value;

    this.communityService.createCommunity(this.communityPayload).subscribe(() => {
      this.router.navigateByUrl('/communities');
    }, () => {
      console.log('Error occurred');
    });
  }

  discard() {
    this.activeModal.close();
  }
}
