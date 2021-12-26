import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SignupComponent} from "../../auth/signup/signup.component";

@Component({
  selector: 'app-welcome-side-bar',
  templateUrl: './welcome-side-bar.component.html',
  styleUrls: ['./welcome-side-bar.component.css']
})
export class WelcomeSideBarComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  signup() {
    this.modal.open(SignupComponent);
  }
}
