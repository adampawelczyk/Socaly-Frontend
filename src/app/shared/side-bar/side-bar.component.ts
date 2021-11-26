import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {faComments, faNewspaper, faUsers} from "@fortawesome/free-solid-svg-icons";

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

  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }

  goToCreateCommunity() {
    this.router.navigateByUrl('/create-community');
  }

}
