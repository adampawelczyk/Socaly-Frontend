import { Component, OnInit } from '@angular/core';
import { CreateCommunityComponent } from '../../community/create-community/create-community.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from '../../post/create-post/create-post.component';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  ngOnInit(): void { }

  createPost() {
    this.modal.open(CreatePostComponent, {size: 'lg'});
  }

  createCommunity() {
    this.modal.open(CreateCommunityComponent);
  }
}
