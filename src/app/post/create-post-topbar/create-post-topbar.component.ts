import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-create-post-topbar',
  templateUrl: './create-post-topbar.component.html',
  styleUrls: ['./create-post-topbar.component.css']
})
export class CreatePostTopbarComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  ngOnInit(): void { }

  createPost() {
    this.modal.open(CreatePostComponent, { size: 'lg' });
  }
}
