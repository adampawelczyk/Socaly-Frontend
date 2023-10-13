import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  createCommunityForm: FormGroup;
  communityPayload: CommunityRequestModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router,
              private communityService: CommunityService,
              public activeModal: NgbActiveModal) {
    this.createCommunityForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.communityPayload = {
      name: '',
      description: ''
    };

    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  ngOnInit(): void { }

  createCommunity(): void {
    this.communityPayload = { ...this.createCommunityForm.value };

    this.communityService.createCommunity(this.communityPayload).subscribe(() => {
      this.activeModal.close();
    }, error => {
      throwError(error);
    });
  }

  discard(): void {
    this.activeModal.close();
  }
}
