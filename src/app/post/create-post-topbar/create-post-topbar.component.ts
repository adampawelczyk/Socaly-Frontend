import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditPostComponent } from '../create-edit-post/create-edit-post.component';

@Component({
  selector: 'app-create-post-topbar',
  templateUrl: './create-post-topbar.component.html',
  styleUrls: ['./create-post-topbar.component.scss']
})
export class CreatePostTopbarComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  ngOnInit(): void { }

  create(): void {
    this.modal.open(CreateEditPostComponent, { size: 'lg' });
  }
}
