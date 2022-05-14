import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostVoteComponent } from './post-vote.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    PostVoteComponent
  ],
  exports: [
    PostVoteComponent
  ]
})

export class PostVoteModule { }
