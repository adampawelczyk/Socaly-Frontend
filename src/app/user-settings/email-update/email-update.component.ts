import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.scss']
})
export class EmailUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

}
