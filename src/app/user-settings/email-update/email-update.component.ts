import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.scss']
})
export class EmailUpdateComponent implements OnInit {
  emailUpdateForm: UntypedFormGroup;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');

    this.emailUpdateForm = new UntypedFormGroup({
      password: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.required)
    });
  }

  discard() {
    this.activeModal.close();
  }
}
