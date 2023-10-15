import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdatePostComponent } from '../create-update-post/create-update-post.component';

@Component({
  selector: 'app-create-post-topbar',
  templateUrl: './create-post-topbar.component.html',
  styleUrls: ['./create-post-topbar.component.scss']
})
export class CreatePostTopbarComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  ngOnInit(): void { }

  createPost(): void {
    this.modal.open(CreateUpdatePostComponent, { size: 'lg' });
  }
}
