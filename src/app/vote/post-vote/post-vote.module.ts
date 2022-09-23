import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostVoteComponent } from './post-vote.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PostVoteComponent
  ],
  exports: [
    PostVoteComponent
  ]
})

export class PostVoteModule { }
