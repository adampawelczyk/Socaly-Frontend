import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faComments, faNewspaper, faUsers } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  discussions: boolean;
  news: boolean;
  communities: boolean;

  faComments = faComments
  faNewspaper = faNewspaper
  faUsers = faUsers

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.discussions = this.router.url === '/'
    this.news = false
    this.communities = this.router.url === '/communities'
  }

  goToDiscussions() {
    if (!this.discussions) {
      this.discussions = true;
      this.news = false;
      this.communities = false;

      this.router.navigateByUrl('');
    }
  }

  goToNews() {
    if (!this.news) {
      this.discussions = false;
      this.news = true;
      this.communities = false;
    }
  }

  goToCommunities() {
    if (!this.communities) {
      this.discussions = false;
      this.news = false;
      this.communities = true;

      this.router.navigateByUrl('/communities');
    }
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }

  goToCreateCommunity() {
    this.router.navigateByUrl('/create-community');
  }

}
