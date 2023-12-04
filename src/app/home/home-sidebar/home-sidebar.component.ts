import { Component, OnInit } from '@angular/core';
import { CreateCommunityComponent } from '../../community/create-community/create-community.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditPostComponent } from '../../post/create-edit-post/create-edit-post.component';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class HomeSidebarComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  ngOnInit(): void { }

  createPost(): void {
    this.modal.open(CreateEditPostComponent, {size: 'lg'});
  }

  createCommunity(): void {
    this.modal.open(CreateCommunityComponent);
  }
}
