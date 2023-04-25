import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.scss']
})
export class EmailUpdateComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  discard() {
    this.activeModal.close();
  }
}
