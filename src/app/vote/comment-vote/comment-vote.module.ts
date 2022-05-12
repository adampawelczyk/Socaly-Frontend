import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentVoteComponent } from './comment-vote.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CommentVoteComponent
  ],
  exports: [
    CommentVoteComponent
  ]
})

export class CommentVoteModule { }
