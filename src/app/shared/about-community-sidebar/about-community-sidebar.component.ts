import {Component, Input, OnInit} from '@angular/core';
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-about-community-sidebar',
  templateUrl: './about-community-sidebar.component.html',
  styleUrls: ['./about-community-sidebar.component.css']
})
export class AboutCommunitySidebarComponent implements OnInit {
  @Input() communityName: string;

  communityDescription: string
  createdDate: string | undefined
  faBirthdayCake = faBirthdayCake

  constructor() { }

  ngOnInit(): void {
  }

}
