import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunityService } from '../shared/community.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunityRequestModel } from '../shared/community-request.model';
import { throwError } from 'rxjs';

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

    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  ngOnInit(): void { }

  createCommunity() {
    this.communityPayload.name = this.createCommunityForm.get('title')?.value;
    this.communityPayload.description = this.createCommunityForm.get('description')?.value;

    this.communityService.createCommunity(this.communityPayload).subscribe(() => {
      this.router.navigateByUrl('/communities');
    }, error => {
      throwError(error);
    });
  }

  discard() {
    this.activeModal.close();
  }
}
