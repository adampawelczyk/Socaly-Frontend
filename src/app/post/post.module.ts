import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { CommentModule } from '../comment/comment.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PostVoteModule } from '../vote/post-vote/post-vote.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { HighlightService } from '../shared/highlight.service';

@NgModule({
  imports: [
    CommonModule,
    CommentModule,
    EditorModule,
    ReactiveFormsModule,
    PostVoteModule,
    NgbModule,
    AppRoutingModule
  ],
  declarations: [
    PostComponent
  ],
  exports: [
    PostComponent
  ],
  providers: [
    HighlightService
  ]
})

export class PostModule { }
